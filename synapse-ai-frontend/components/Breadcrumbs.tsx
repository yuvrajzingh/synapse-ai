"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment, useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/firebase";

function Breadcrumbs() {
  const path = usePathname();
  const segments = path.split("/")
  const id = segments[segments.length - 1]
  console.log(id)
  const [data] = useDocument(doc(db, "documents", id));
  const [title, setTitle] = useState('...')

  useEffect(() => {
      if (data) {
        setTitle(data?.data()?.title);
      }
    }, [data]);

  return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
            {
                segments.map((segment, index) =>{
                    if(!segment) return null;

                    const href = `/${segments.slice(0, index + 1).join("/")}`
                    const isLast = index === segments.length - 1

                    return (
                        <Fragment key={segment}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                            {
                                isLast ? (
                                    <BreadcrumbPage>{title}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
                                    ) 
                            }                                
                            </BreadcrumbItem>
                        </Fragment>    
                    )
                })
            }
        </BreadcrumbList>
      </Breadcrumb>
  );
}
export default Breadcrumbs;
