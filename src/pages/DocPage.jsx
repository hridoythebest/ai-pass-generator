import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { FaArrowLeft } from 'react-icons/fa';
import './DocPage.scss';

const DocPage = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const { docId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadDocument = async () => {
      setLoading(true);
      try {
        let response;
        if (docId.startsWith('legal-')) {
          const legalDoc = docId.replace('legal-', '');
          response = await fetch(`/docs/legal/${legalDoc}.md`);
        } else {
          response = await fetch(`/docs/${docId}.md`);
        }
        
        if (!response.ok) {
          throw new Error('Failed to load document');
        }
        
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('Error loading document:', error);
        setContent('Error loading document. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadDocument();
  }, [docId]);

  return (
    <div className="doc-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>
      <div className="doc-content">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <ReactMarkdown>{content}</ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default DocPage;
