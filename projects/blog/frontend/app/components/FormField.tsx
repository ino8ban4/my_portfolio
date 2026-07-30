type Props = {
  id: string
  name: string
  label: string
  defaultValue?: string
}

export function FormField({ id, name, label, defaultValue }: Props) {
  return(
    <div className='flex flex-col gap-1'>
    <label htmlFor={id} >{label}</label>
    <input id={id}
              name={name} 
              defaultValue={defaultValue}
              className='bg-neutral-900 border border-neutral-600 text-neutral-100 rounded px-3 py-2'
    />
    </div>
  )
}
