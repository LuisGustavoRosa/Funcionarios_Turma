import { useEffect, useState } from 'react'
import { Button } from './Components/Atoms/Button'
import { Label } from './Components/Molecules/Label'
import { api } from './assets/Api/Api'
import { Form, List } from './style'

function App() {

   interface Funcionarios {
    id: number;
    nome : string
    turno : {
      id : number;
      nome: string
      inicio : string
      fim : string
    }
  }
  interface turno {
      id:number
      nome: string
  }

  const [funcionarios, SetFuncionarios] = useState<Funcionarios[]>([]);
  const [date, setDate] = useState()
  const [listFuncionarios, setListFuncionarios] = useState<turno[]>([])
  const [dateInicial,setDateInicial] = useState()
  const [dateFinal,setDateFinal] = useState()
  const [listDateInicialFinals,setListDateFinal] = useState<turno[]>([])

  async function getFuncionarios() {
    try {
      const { data } = await api.get('Funcionarios');

      if (!data) return
      SetFuncionarios(data);

    } catch (error) {
      return error
    }
  }
  useEffect(() => {
    getFuncionarios()
    
  }, [])
  const handleSubmitDate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { data } = await api.get(`Turnos/${date}`)
    setListFuncionarios(data)
  }
  const handleSubmitDateInicialeFinal = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    const { data } = await api.get(`Turnos/${dateInicial}/${dateFinal}`)
    setListDateFinal(data)
  }
  const handleSubmitClear = async () => {
    setListFuncionarios([])
  }
  return (
    <>
      <Form onSubmit={handleSubmitDate}>
        <h3>Busca por Horario</h3>
        <Label onChange={(e: any) =>
          setDate(e.target.value as any)}
          value={date}
          placeholder="Digite uma data"

        />
        <Button props='Consultar' />
      <button onClick={handleSubmitClear}>Limpar Campo</button>
      </Form>
      <List>
      {listFuncionarios && listFuncionarios.map((e) => (
      <div className='dado' key={e.id}>
       {e.nome}--------
      </div>
    ))}

      </List>
      <Form onSubmit={handleSubmitDateInicialeFinal}>
        <h3>Busca por Intervalo</h3>
        <Label onChange={(e: any) =>
          setDateInicial(e.target.value as any)}
          value={dateInicial}
          placeholder="Digite um inicio"
        />
         <Label onChange={(e: any) =>
          setDateFinal(e.target.value as any)}
          value={dateFinal}
          placeholder="Digite um fim"
        />
        <Button props='Consultar' />
      <button onClick={handleSubmitClear}>Limpar Campo</button>
      <List>
      {listDateInicialFinals && listDateInicialFinals.map((e) => (
      <div className='dado' key={e.id}>
       {e.nome}--------
      </div>
    ))}

      </List>
      </Form>
        <h3>Listagem de todos os funcionarios com os turno</h3>
      <List>
        {funcionarios && funcionarios.map((e) => (
          <div className='dado' key={e.id}>
           {e.nome}--------{e.turno.nome}-------{e.turno.inicio}------{e.turno.fim}
          </div>
        ))}
      </List>
    </>
  )
}
export default App
