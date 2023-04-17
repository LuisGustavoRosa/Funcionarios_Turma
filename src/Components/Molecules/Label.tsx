export const Label = ({placeholder, value, onChange} : any) => {
  return (
    <label htmlFor="Preco">
        <input type="text" 
        placeholder= {placeholder}
        value= {value} 
        onChange= {onChange} />
      </label>
  )
}