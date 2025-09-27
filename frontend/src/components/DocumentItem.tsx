import React from 'react';
import { Download, Trash2 } from 'lucide-react';
import { Document } from '../types/api';

interface Props {
  document: Document;
  onDelete: (id: string) => void;
}

const DocumentItem: React.FC<Props> = ({ document, onDelete }) => {
  const { fileName, fileUrl, fileSize, timestamp, fileKey } = document;
  const hasValidUrl = !!fileUrl;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (stamp: string): string => {
    const d = new Date(parseInt(stamp, 10));
    if (isNaN(d.getTime())) return 'Invalid Date';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(d);
  };

  const getFileExtension = (filename: string) => {
    const extension = filename.split('.').pop()?.toUpperCase();
    return extension || 'FILE';
  };

  const getFileTypeIcon = (filename: string) => {
    const extension = getFileExtension(filename);
    return extension.charAt(0);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
      key={fileKey}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1 min-w-0">
          <div className="flex-shrink-0">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold uppercase">
              {getFileTypeIcon(fileName)}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate" title={fileName}>
              {fileName}
            </h3>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
              <div>{formatFileSize(fileSize)}</div>
              <div>{formatDate(timestamp)}</div>
            </div>

            <div className="mt-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {getFileExtension(fileName)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
          <button
            onClick={() => hasValidUrl && window.open(fileUrl, '_blank')}
            className={`p-2 rounded-lg transition-colors ${
              hasValidUrl
                ? 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                : 'text-gray-300 cursor-not-allowed'
            }`}
            title={hasValidUrl ? 'Download' : 'File not available'}
            disabled={!hasValidUrl}
          >
            <Download className="h-5 w-5" />
          </button>

          <button
            onClick={() => {
              if (fileKey && window.confirm('Are you sure you want to delete this document?')) {
                console.log('Deleting fileKey:', fileKey);
                onDelete(String(fileKey));
              }
            }}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
            disabled={!fileKey}
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentItem;
