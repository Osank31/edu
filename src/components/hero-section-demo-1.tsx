'use client';

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export default function HeroSectionOne() {
    const router = useRouter();
    return (
        <div className="relative flex flex-col items-center justify-center">
            <Navbar />
            <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
                <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
            </div>
            <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
                <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
                <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            </div>
            <div className="px-4 py-10 md:py-20">
                <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
                    {'Empower Learning Through Digital Education'.split(' ').map((word, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
                            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                            transition={{
                                duration: 0.3,
                                delay: index * 0.1,
                                ease: 'easeInOut',
                            }}
                            className="mr-2 inline-block"
                        >
                            {word}
                        </motion.span>
                    ))}
                </h1>
                <motion.p
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.3,
                        delay: 0.8,
                    }}
                    className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
                >
                    Connect teachers and students in a seamless learning environment. Create
                    courses, manage classrooms, and track progress all in one platform designed for
                    modern education.
                </motion.p>
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.3,
                        delay: 1,
                    }}
                    className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
                >
                    <SignedOut>
                        <SignInButton>
                            <button className="w-60 transform rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                                Get Started as Teacher
                            </button>
                        </SignInButton>
                        <SignUpButton>
                            <button className="w-60 transform rounded-lg border border-blue-300 bg-white px-6 py-3 font-medium text-blue-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-50 dark:border-blue-700 dark:bg-gray-900 dark:text-blue-400 dark:hover:bg-gray-800">
                                Join as Student
                            </button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <Button
                            onClick={() => router.push('/dashboard/student')}
                            className="w-60 transform rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700"
                        >
                            Go to Dashboard
                        </Button>
                        <button className="w-60 transform rounded-lg border border-blue-300 bg-white px-6 py-3 font-medium text-blue-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-50 dark:border-blue-700 dark:bg-gray-900 dark:text-blue-400 dark:hover:bg-gray-800">
                            Explore Courses
                        </button>
                    </SignedIn>
                </motion.div>
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 10,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.3,
                        delay: 1.2,
                    }}
                    className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
                >
                    <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
                        <div className="aspect-[16/9] h-auto w-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                            <div className="text-center space-y-4">
                                <div className="text-6xl">📚</div>
                                <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                                    Interactive Learning Dashboard
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                                    Manage courses, track progress, and engage with students in
                                    real-time
                                </p>
                                <div className="flex justify-center space-x-4 pt-4">
                                    <div className="bg-white dark:bg-gray-700 rounded-lg p-3 shadow-md">
                                        <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Active Students
                                        </div>
                                        <div className="text-2xl font-bold text-blue-600">
                                            1,247
                                        </div>
                                    </div>
                                    <div className="bg-white dark:bg-gray-700 rounded-lg p-3 shadow-md">
                                        <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Courses
                                        </div>
                                        <div className="text-2xl font-bold text-green-600">156</div>
                                    </div>
                                    <div className="bg-white dark:bg-gray-700 rounded-lg p-3 shadow-md">
                                        <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Teachers
                                        </div>
                                        <div className="text-2xl font-bold text-purple-600">89</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export const Navbar = () => {
    const router = useRouter();
    return (
        <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
            <div className="flex items-center gap-2">
                <div className="size-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
                <h1 className="text-base font-bold md:text-2xl">EduPlatform</h1>
            </div>
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
                    <Button onClick={() => router.push('/dashboard/student')}>Dashboard</Button>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    );
};
