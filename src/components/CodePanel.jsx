function generateJavaCode(cls, relationships, allClasses) {
  const inheritsFrom = relationships.find(r => r.type === 'inheritance' && r.fromId === cls.id)
  const parentClass = inheritsFrom ? allClasses.find(c => c.id === inheritsFrom.toId) : null

  let code = `public class ${cls.name}`
  if (parentClass) code += ` extends ${parentClass.name}`
  code += ` {\n\n`

  cls.attributes.forEach(attr => {
    code += `    private ${attr.type} ${attr.name};\n`
  })

  if (cls.attributes.length > 0) code += `\n`

  cls.methods.forEach(method => {
    code += `    public ${method.returnType} ${method.name}() {\n`
    code += `        // TODO: implement\n`
    if (method.returnType !== 'void') {
      code += `        return null;\n`
    }
    code += `    }\n\n`
  })

  code += `}`
  return code
}

function CodePanel({ classes, relationships }) {
  return (
    <div className="code-panel">
      <h3 className="code-panel-title">Generated Java Code</h3>
      {classes.length === 0 ? (
        <p className="inspector-empty">Add a class to see generated code.</p>
      ) : (
        classes.map(cls => (
          <div key={cls.id} className="code-block">
            <pre>{generateJavaCode(cls, relationships, classes)}</pre>
          </div>
        ))
      )}
    </div>
  )
}

export default CodePanel