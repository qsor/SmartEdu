import { useEffect, useState } from 'react';
import CertificateCard from '../components/CertificateCard';
import { Footer } from '../components/Footer';

// 🔹 Утилита для скачивания пустого валидного PDF
const downloadEmptyPDF = (fileName = 'certificate.pdf') => {
  const pdfContent = `%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] >> endobj
xref 0 4
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
trailer << /Size 4 /Root 1 0 R >>
startxref 192
%%EOF`;

  const blob = new Blob([pdfContent], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

interface Certificate {
  id: number;
  title: string;
  category: string;
  status: 'completed' | 'in-progress' | 'unavailable';
  progress: number;
  receivedDate?: string;
}

const completedLessonId = 'typescript-types';
const certificatePopupShownKey = 'typescript_certificate_popup_shown';

const getCompletedLessons = (): string[] => {
  try {
    const completedLessons = JSON.parse(localStorage.getItem('completed_lessons') || '[]');
    return Array.isArray(completedLessons) ? completedLessons : [];
  } catch {
    return [];
  }
};

const hasReceivedCertificate = () => getCompletedLessons().includes(completedLessonId);

const getCertificates = (): Certificate[] => {
  const certificates: Certificate[] = [
    {
      id: 1,
      title: 'Основы JavaScript',
      category: 'Frontend разработка',
      status: 'completed',
      progress: 100,
      receivedDate: '12.06.2026',
    },
    {
      id: 2,
      title: 'Основы JavaScript',
      category: 'Frontend разработка',
      status: 'in-progress',
      progress: 75,
    },
    {
      id: 3,
      title: 'Основы JavaScript',
      category: 'Frontend разработка',
      status: 'unavailable',
      progress: 20,
    },
  ];

  if (!hasReceivedCertificate()) {
    return certificates;
  }

  return [
    {
      id: 4,
      title: 'TypeScript с нуля',
      category: 'Frontend разработка',
      status: 'completed',
      progress: 100,
      receivedDate: new Date().toLocaleDateString('ru-RU'),
    },
    ...certificates,
  ];
};

export default function CertificatesPage() {
  const [certificates] = useState<Certificate[]>(getCertificates);
  const [isCertificatePopupOpen, setIsCertificatePopupOpen] = useState(false);

  useEffect(() => {
    if (!hasReceivedCertificate() || localStorage.getItem(certificatePopupShownKey)) {
      return;
    }
    setIsCertificatePopupOpen(true);
    localStorage.setItem(certificatePopupShownKey, 'true');
  }, []);

  const stats = {
    total: certificates.filter((c) => c.status === 'completed').length,
    unavailable: certificates.filter((c) => c.status === 'unavailable').length,
    inProgress: certificates.filter((c) => c.status === 'in-progress').length,
  };

  const handleDownload = (certificateId: number) => {
    const cert = getCertificates().find(c => c.id === certificateId);
    const fileName = cert 
      ? `certificate-${cert.title.toLowerCase().replace(/\s+/g, '-')}.pdf`
      : `certificate-${certificateId}.pdf`;
    
    downloadEmptyPDF(fileName);
  };

  const handleContinue = (certificateId: number) => {
    console.log(`Продолжить курс ${certificateId}`);
  };

  return (
    <div className="w-full pt-10 pb-10">
      {/* Заголовок страницы */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Сертификаты</h1>
          <p className="text-lg text-gray-500">
            Здесь отображаются сертификаты за пройденные курсы
          </p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-colors">
          Все курсы
        </button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-gray-600">Всего сертификатов</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">{stats.unavailable}</p>
            <p className="text-gray-600">недоступен</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">{stats.inProgress}</p>
            <p className="text-gray-600">В процессе</p>
          </div>
        </div>
      </div>

      {/* Карточки сертификатов */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <CertificateCard
            key={cert.id}
            title={cert.title}
            category={cert.category}
            status={cert.status}
            progress={cert.progress}
            receivedDate={cert.receivedDate}
            onDownload={() => handleDownload(cert.id)}
            onContinue={() => handleContinue(cert.id)}
          />
        ))}
      </div>

      {isCertificatePopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-popup-title"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-3xl font-bold text-orange-500">
              ✓
            </div>
            <h2
              id="certificate-popup-title"
              className="mb-2 text-2xl font-bold text-gray-900"
            >
              Сертификат получен!
            </h2>
            <p className="mb-6 text-gray-600">
              Поздравляем, сертификат за курс «TypeScript с нуля» уже доступен в этом разделе.
            </p>
            <button
              type="button"
              className="w-full rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-600"
              onClick={() => setIsCertificatePopupOpen(false)}
            >
              Отлично
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}