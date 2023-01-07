import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

const App = () => {
  const [data, setData] = useState();
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      list: [{ firstName: '', lastName: '' }]
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "list"
  });

  const onSave = data => {
    setData({ ...data });
  }

  return <form onSubmit={handleSubmit(onSave)}>
    <h4>Dynamic form with react-hook-form using useFieldArray - <a href="https://www.cluemediator.com/" target="_blank" rel="noopener noreferrer">Clue Mediator</a></h4>
    {fields.map((field, index) => (
      <div className="box" key={field.id}>
        <div>
          <input
            placeholder="Enter First Name"
            {...register(`list.${index}.firstName`)}
          />
        </div>
        <div>
          <input
            className="ml10"
            placeholder="Enter Last Name"
            {...register(`list.${index}.lastName`)}
          />
        </div>
        <div className="btn-box">
          {fields.length !== 1 && <button
            className="mr10"
            onClick={() => remove(index)}>Remove</button>}
          {fields.length - 1 === index && <button onClick={() => append({ firstName: '', lastName: '' })}>Add</button>}
        </div>
      </div>
    ))}
    <button>Submit</button>
    {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
  </form>
}

export default App;