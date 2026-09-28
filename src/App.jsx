import { useState } from 'react'
import ClassBox from './components/ClassBox'
import Inspector from './components/Inspector'
import RelationshipLines from './components/RelationshipLines'
import CodePanel from './components/CodePanel'
import './App.css'

let classCounter = 2
let relCounter = 1

function App() {
  const [classes, setClasses] = useState([
    {
      id: 'class-1',
      name: 'Student',
      x: 150,
      y: 150,
      attributes: [
        { id: 'a1', name: 'name', type: 'String' },
        { id: 'a2', name: 'age', type: 'int' },
      ],
      methods: [
        { id: 'm1', name: 'getName', returnType: 'String' },
      ],
    },
  ])
  const [relationships, setRelationships] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [connectMode, setConnectMode] = useState(false)
  const [connectFrom, setConnectFrom] = useState(null)
  const [showCode, setShowCode] = useState(false)

  const moveClass = (id, x, y) => {
    setClasses(prev => prev.map(c => c.id === id ? { ...c, x, y } : c))
  }

  const addClass = () => {
    const newClass = {
      id: `class-${classCounter++}`,
      name: `NewClass${classCounter}`,
      x: 300,
      y: 200,
      attributes: [],
      methods: [],
    }
    setClasses(prev => [...prev, newClass])
  }

  const deleteClass = (id) => {
    setClasses(prev => prev.filter(c => c.id !== id))
    setRelationships(prev => prev.filter(r => r.fromId !== id && r.toId !== id))
    setSelectedId(null)
  }

  const updateClass = (id, updates) => {
    setClasses(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c))
  }

  const deleteRelationship = (id) => {
    setRelationships(prev => prev.filter(r => r.id !== id))
  }

  const handleClassClick = (id) => {
    if (!connectMode) {
      setSelectedId(id)
      return
    }

    if (!connectFrom) {
      setConnectFrom(id)
    } else if (connectFrom !== id) {
      const newRel = {
        id: `rel-${relCounter++}`,
        fromId: connectFrom,
        toId: id,
        type: 'association',
      }
      setRelationships(prev => [...prev, newRel])
      setConnectFrom(null)
      setConnectMode(false)
    }
  }

  const selectedClass = classes.find(c => c.id === selectedId)

  return (
    <div className="app">
      <div className="toolbar">
        <div className="toolbar-title">
          <h1>UML Class Diagram Generator</h1>
          <span className="student-credit">Mohammed Ayman Siddiqui · CS-H · Roll 13 · PRN 12414007</span>
        </div>
        <div className="toolbar-actions">
          <button className="btn-add" onClick={addClass}>+ Add Class</button>
          <button
            className={`btn-connect ${connectMode ? 'active' : ''}`}
            onClick={() => {
              setConnectMode(!connectMode)
              setConnectFrom(null)
            }}
          >
            {connectMode ? (connectFrom ? 'Click target class...' : 'Click first class...') : '⟶ Connect Classes'}
          </button>
          <button className="btn-code" onClick={() => setShowCode(!showCode)}>
            {showCode ? 'Hide Code' : '</> View Java Code'}
          </button>
        </div>
      </div>
      <div className="workspace">
        <div className="canvas" onMouseDown={() => !connectMode && setSelectedId(null)}>
          <RelationshipLines classes={classes} relationships={relationships} onDelete={deleteRelationship} />
          {classes.map(cls => (
            <ClassBox
              key={cls.id}
              classData={cls}
              onMove={moveClass}
              onSelect={handleClassClick}
              isSelected={selectedId === cls.id || connectFrom === cls.id}
            />
          ))}
        </div>
        {showCode ? (
          <CodePanel classes={classes} relationships={relationships} />
        ) : (
          <Inspector
            selectedClass={selectedClass}
            onUpdate={updateClass}
            onDelete={deleteClass}
          />
        )}
      </div>
    </div>
  )
}

export default App