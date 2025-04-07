import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-gray-800">Patient Portal</h1>
                <p className="text-center text-gray-600">Welcome to the assessment portal. Click below to begin your pre-assessment.</p>
                <div className="flex justify-center pt-4">
                    <Button asChild className="w-full">
                        <Link href="/patient/assessment/new">Begin Pre-Assessment</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}