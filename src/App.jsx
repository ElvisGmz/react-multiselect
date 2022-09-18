import React from 'react';
import Select from './components/Select';

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData.getAll('select'));
  };

  const items = [
    {
      label: 'Item 1',
      value: '1',
    },
    {
      label: 'Item 2',
      value: '2',
    },
    {
      label: 'Item 3',
      value: '3',
    },
    {
      label: 'Item 4',
      value: '4',
    },
    {
      label: 'Item 5',
      value: '5',
    },
    {
      label: 'Item 6',
      value: '6',
    },
    {
      label: 'Item 7',
      value: '7',
    },
    {
      label: 'Item 8',
      value: '8',
    },
    {
      label: 'United States Of America',
      value: 'united-states-of-america',
    },
    {
      label: 'United Kingdom',
      value: 'united-kingdom',
    },
  ];

  return (
    <div className="p-4">
      <form
        className="flex flex-col gap-4 p-4 bg-blue-50 rounded-xl"
        onSubmit={handleSubmit}
      >
        <Select
          name="select"
          placeholder="Seleccionar"
          options={items}
          required
        />
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2.5 rounded-lg"
            type="submit"
          >
            Send Me
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
