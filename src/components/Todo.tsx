// Visible placeholder for content the client still needs to supply.
// Search the codebase for "<Todo" or "[TODO" to find every open item.
export default function Todo({ children }: { children: React.ReactNode }) {
  return <span className="todo">[TODO: {children}]</span>
}

export function TodoBlock({ children }: { children: React.ReactNode }) {
  return (
    <p className="todo-block">
      <strong>[TODO]</strong> {children}
    </p>
  )
}
