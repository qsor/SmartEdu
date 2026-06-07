import { Link } from 'react-router-dom';

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-[230px] border-r border-black/10 bg-white">
      <div className="flex h-[56px] items-center gap-2 px-5">
        <div className="h-9 w-9 rounded-full bg-zinc-200" />
        <span className="font-semibold text-white">EduSphere</span>
      </div>

      <nav className="mt-10 space-y-6 px-6">
        <Link to="/dashboard" className="flex items-center gap-5 text-sm transition-colors">
          <span>Дашборд</span>
        </Link>
        <Link to="/progress" className="flex items-center gap-5 text-sm transition-colors">
          <span>Прогресс</span>
        </Link>
        <Link to="/certificates" className="flex items-center gap-5 text-sm transition-colors">
          <span>Сертификаты</span>
        </Link>
        <Link to="/courses" className="flex items-center gap-5 text-sm transition-colors">
          <span>Все курсы</span>
        </Link>
      </nav>
    </aside>
  );
}
