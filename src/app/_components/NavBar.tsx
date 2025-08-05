import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

function NavBar() {
    return (
        <div className="flex justify-end items-center p-4 gap-4">
            <SignedOut>
                <SignInButton>
                    <Button variant={'link'}>Sign In</Button>
                </SignInButton>
                <SignUpButton>
                    <Button variant={'link'}>Sign Up</Button>
                </SignUpButton>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    );
}
export default NavBar;
