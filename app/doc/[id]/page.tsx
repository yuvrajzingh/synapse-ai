'use client'

import Document from "@/components/Document"
import { useEffect, useState } from "react";

function DocumentPage({ params }: { params: { id: string } }) {
    const [id, setId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function unwrapParams() {
            try {
                const { id } = await params;
                setId(id);
            } catch (error) {
                console.error("Error getting document ID:", error);
            } finally {
                setLoading(false);
            }
        }
        unwrapParams();
    }, [params]);

    if (loading) {
        return <div className="flex flex-col flex-1 min-h-screen">Loading...</div>;
    }

    if (!id) {
        return <div className="flex flex-col flex-1 min-h-screen">Document not found</div>;
    }

    return (
        <div className="flex flex-col flex-1 min-h-screen">
    
            <Document id={id} />
        </div>
    );
}

export default DocumentPage;