import { useEffect, useState } from 'react';
import { openDB } from 'idb';
import { v4 as uuidv4 } from 'uuid';
import { IDocumentsForm } from 'types/forms';

const initialDocuments: IDocumentsForm[] = [
  {
    id: uuidv4(),
    isSelected: false
  }
];

export const useIndexDB = () => {
  const [documents, setDocuments] = useState<IDocumentsForm[]>([]);

  useEffect(() => {
    const loadDocuments = async () => {
      const db = await openDB('documentsDB', 1, {
        upgrade(db) {
          db.createObjectStore('documents', { keyPath: 'id' });
        }
      });
      const allDocuments = await db.getAll('documents');
      if (allDocuments.length === 0) {
        await db.add('documents', initialDocuments[0]);
        setDocuments(initialDocuments);
      } else {
        setDocuments(allDocuments);
      }
    };

    loadDocuments();
  }, []);

  return { documents, setDocuments };
};
