'use client'

type TabItem<T extends string = string> = {
  value: T
  label: string
}

type TabsProps<T extends string> = {
  items: TabItem<T>[]
  value: T
  onChange: (value: T) => void
}

export function Tabs<T extends string>({ items, value, onChange }: TabsProps<T>) {
  return (
    <div className="border-line inline-flex gap-1 border-b" role="tablist">
      {items.map((item) => {
        const active = item.value === value
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.value)}
            className={`relative px-4 py-2 text-[13px] font-medium transition-colors ${
              active ? 'text-felt' : 'text-ink-2 hover:text-ink-1'
            }`}
          >
            {item.label}
            {active && <span className="bg-felt absolute right-0 -bottom-px left-0 h-0.5" />}
          </button>
        )
      })}
    </div>
  )
}
