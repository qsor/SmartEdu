export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-[230px] border-r border-black/10 bg-white">
      <div className="flex h-[56px] items-center gap-2 px-5">
        <div className="h-9 w-9 rounded-full bg-zinc-200" />
        <span className="font-semibold text-white">EduSphere</span>
      </div>

      <nav className="mt-10 space-y-6 px-6">
        <button className="flex items-center gap-5 text-sm transition-colors">
          <span>Дашборд</span>
        </button>
        <button className="flex items-center gap-5 text-sm transition-colors">
          <span>Прогресс</span>
        </button>
        <button className="flex items-center gap-5 text-sm transition-colors">
          <span>Сертификаты</span>
        </button>
        <button className="flex items-center gap-5 text-sm transition-colors">
          <span>Все курсы</span>
        </button>
      </nav>
    </aside>
  );
}
