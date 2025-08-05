import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; // <--- Import Textarea here
import axios from 'axios';
import { useState } from 'react';

function CreateClassroomDialog() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;

        try {
            const response = await axios.post('/api/course', { title, description });
            if (response.status === 201) {
                alert('Classroom created successfully');
                window.location.reload();
            } else {
                setError('Failed to create classroom');
            }
        } catch (error) {
            console.error('Error creating classroom:', error);
            setError('Error creating classroom');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create Classroom</Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={submitHandler} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Create Classroom</DialogTitle>
                        <DialogDescription>
                            Create a new classroom to manage your courses and students.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Programming in C..."
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Enter a brief description..."
                                required
                                className="min-h-[6rem]" // adjust height as needed
                            />
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button" disabled={isSubmitting}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default CreateClassroomDialog;
