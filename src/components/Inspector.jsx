let attrCounter = 100
let methodCounter = 100

function Inspector({ selectedClass, onUpdate, onDelete }) {
  if (!selectedClass) {
    return (
      <div className="inspector">
        <p className="inspector-empty">Select a class to edit its details.</p>
      </div>
    )
  }

  const updateName = (name) => {
    onUpdate(selectedClass.id, { name })
  }

  const addAttribute = () => {
    const newAttr = { id: `a${attrCounter++}`, name: 'newField', type: 'String' }
    onUpdate(selectedClass.id, { attributes: [...selectedClass.attributes, newAttr] })
  }

  const updateAttribute = (attrId, field, value) => {
    const updated = selectedClass.attributes.map(a =>
      a.id === attrId ? { ...a, [field]: value } : a
    )
    onUpdate(selectedClass.id, { attributes: updated })
  }

  const deleteAttribute = (attrId) => {
    onUpdate(selectedClass.id, {
      attributes: selectedClass.attributes.filter(a => a.id !== attrId),
    })
  }

  const addMethod = () => {
    const newMethod = { id: `m${methodCounter++}`, name: 'newMethod', returnType: 'void' }
    onUpdate(selectedClass.id, { methods: [...selectedClass.methods, newMethod] })
  }

  const updateMethod = (methodId, field, value) => {
    const updated = selectedClass.methods.map(m =>
      m.id === methodId ? { ...m, [field]: value } : m
    )
    onUpdate(selectedClass.id, { methods: updated })
  }

  const deleteMethod = (methodId) => {
    onUpdate(selectedClass.id, {
      methods: selectedClass.methods.filter(m => m.id !== methodId),
    })
  }

  return (
    <div className="inspector">
      <div className="inspector-header">
        <label>Class name</label>
        <input
          type="text"
          value={selectedClass.name}
          onChange={(e) => updateName(e.target.value)}
          className="inspector-input"
        />
      </div>

      <div className="inspector-section">
        <div className="inspector-section-header">
          <span>Attributes</span>
          <button onClick={addAttribute} className="btn-mini">+ Add</button>
        </div>
        {selectedClass.attributes.map(attr => (
          <div key={attr.id} className="inspector-row">
            <input
              value={attr.name}
              onChange={(e) => updateAttribute(attr.id, 'name', e.target.value)}
              placeholder="name"
            />
            <input
              value={attr.type}
              onChange={(e) => updateAttribute(attr.id, 'type', e.target.value)}
              placeholder="type"
              className="type-input"
            />
            <button onClick={() => deleteAttribute(attr.id)} className="btn-remove">×</button>
          </div>
        ))}
      </div>

      <div className="inspector-section">
        <div className="inspector-section-header">
          <span>Methods</span>
          <button onClick={addMethod} className="btn-mini">+ Add</button>
        </div>
        {selectedClass.methods.map(method => (
          <div key={method.id} className="inspector-row">
            <input
              value={method.name}
              onChange={(e) => updateMethod(method.id, 'name', e.target.value)}
              placeholder="name"
            />
            <input
              value={method.returnType}
              onChange={(e) => updateMethod(method.id, 'returnType', e.target.value)}
              placeholder="return type"
              className="type-input"
            />
            <button onClick={() => deleteMethod(method.id)} className="btn-remove">×</button>
          </div>
        ))}
      </div>

      <button onClick={() => onDelete(selectedClass.id)} className="btn-delete-class">
        Delete this class
      </button>
    </div>
  )
}

export default Inspector