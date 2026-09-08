function RelationshipLines({ classes, relationships, onDelete }) {
  const getClassCenter = (id) => {
    const cls = classes.find(c => c.id === id)
    if (!cls) return { x: 0, y: 0 }
    return { x: cls.x + 100, y: cls.y + 40 }
  }

  return (
    <svg className="relationship-svg">
      {relationships.map(rel => {
        const from = getClassCenter(rel.fromId)
        const to = getClassCenter(rel.toId)
        const midX = (from.x + to.x) / 2
        const midY = (from.y + to.y) / 2

        return (
          <g key={rel.id}>
            <line
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#64748b"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            <circle
              cx={midX}
              cy={midY}
              r="8"
              fill="#fee2e2"
              stroke="#dc2626"
              strokeWidth="1"
              className="rel-delete-dot"
              onClick={() => onDelete(rel.id)}
            />
            <text x={midX} y={midY + 4} textAnchor="middle" fontSize="10" fill="#dc2626" className="rel-delete-x">×</text>
          </g>
        )
      })}
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
        </marker>
      </defs>
    </svg>
  )
}

export default RelationshipLines