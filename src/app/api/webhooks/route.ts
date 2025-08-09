import { db } from '@/config/db'
import { userTable } from '@/config/schema'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { eq } from 'drizzle-orm'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const evt = await verifyWebhook(req, {
            signingSecret: process.env.CLERK_WEBHOOK_SECRET!
        })

        const { id } = evt.data
        const eventType = evt.type
        // console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
        // console.log('Webhook payload:', evt.data)

        if (eventType === 'user.created') {
            console.log('userId:', id)
            // Handle user.created event
            const data = {
                userId: id,
                username: evt.data.first_name,
                email: evt.data.email_addresses[0].email_address,
                createdAt: new Date(evt.data.created_at),
                updatedAt: new Date(evt.data.updated_at),
                provider: evt.data?.external_accounts[0]?.provider
            }
            const user = await db.select().from(userTable).where(eq(userTable.email, evt.data.email_addresses[0].email_address))
            if (user.length > 0) {
                return new Response('User already exists', { status: 409 });
            }
            const result = await db.insert(userTable).values(data).returning();
            return new Response('User created', { status: 201 });
        }
        if (eventType === 'user.deleted') {
            console.log('userId:', id)
        }

        return new Response('Webhook received', { status: 200 })
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error verifying webhook', { status: 400 })
    }
}