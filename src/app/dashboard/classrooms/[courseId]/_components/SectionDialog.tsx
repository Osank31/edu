import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"   // <--- Import Textarea here
import axios from "axios"
import { ParamValue } from "next/dist/server/request/params"
import { useState } from "react"

function SectionDialog({courseId}: {courseId: ParamValue}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        const formData = new FormData(e.currentTarget);
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;

        try {
            const response = await axios.post("/api/section", { title, description, courseId });
            if (response.status === 201) {
                alert("Section created successfully");
                window.location.reload();
            } else {
                setError("Failed to create section");
            }
        } catch (error) {
            console.error("Error creating section:", error);
            setError("Error creating section");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create Section</Button>
            </DialogTrigger>
            <DialogContent>
                <form className="space-y-4" onSubmit={submitHandler}>
                    <DialogHeader>
                        <DialogTitle>Create Section</DialogTitle>
                        <DialogDescription>
                            Create a new section to manage your courses and students.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" placeholder="Programming in C..." required />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Enter a brief description..."
                                required
                                className="min-h-[6rem]"
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
                            {isSubmitting ? "Saving..." : "Save changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default SectionDialog