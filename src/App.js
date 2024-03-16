import React, { useState } from 'react';

const App = () => {
	// single todo
	const [todo, setTodo] = useState('');
	// all todos
	const [todos, setTodos] = useState([]);
	const [editId, setEditId] = useState(0);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (todo !== '') {
			setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
			setTodo('');
		}

		if (editId) {
			const editTodo = todos.find((i) => i.id === editId);
			const updateTodo = todos.map((t) =>
				t.id === editTodo.id
					? (t = { id: t.id, todo })
					: { id: t.id, todo: t.todo },
			);

			setTodos(updateTodo);
			setEditId(0);
			setTodo('');
			return;
		}
	};

	const handleDelete = (id) => {
		const updatedTodos = todos.filter((todo) => todo.id !== id);
		setTodos([updatedTodos]);
	};

	const handleEdit = (id) => {
		const editTodo = todos.find((i) => i.id === id);
		setTodo(editTodo.todo);
		setEditId(id);
	};

	return (
		<div className='App'>
			<div className='container'>
				<h1>Todo App</h1>

				<form
					className='form-container'
					onSubmit={handleSubmit}>
					<input
						type='text'
						placeholder='what  needs to be done?'
						className='input-box'
						value={todo}
						onChange={(e) => {
							setTodo(e.target.value);
						}}
					/>
					<button
						className='task-btn'
						type='submit'>
						{editId ? 'Edit' : 'Add Task'}
					</button>
				</form>

				<ul className='all-todos'>
					{todos.map((t) => (
						<li
							className='todo-list'
							key={t.id}>
							<span className='todo-text'>{t.todo}</span>
							<button
								className='btn'
								onClick={() => {
									handleEdit(t.id);
								}}>
								edit
							</button>
							<button
								className='btn'
								onClick={() => handleDelete(t.id)}>
								delete
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default App;
