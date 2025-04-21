import { useContext } from "react";
import { DocumentContext } from "../context/DocumentContext";

export function useDocument() {
    const { pickDocument, openDocument, deleteDocument } = useContext(DocumentContext)

    return { pickDocument, openDocument, deleteDocument }
}