import { useQuery, gql } from '@apollo/client';
import './App.css'

const getTodos = gql`
	query getTodos {
		getAllTodos {
			id
			title
			completed
			user {
				id
				name
				email
			}
		}
	}
`;

function App() {
    const { loading, error, data } = useQuery(getTodos);

	if (loading) return <p>Loading...</p>;

	const todos  = data.getAllTodos;
	console.log(todos[0])

    return (
		<div className='flex justify-center'>
			<table className=' rounded-md overflow-hidden'>
				<thead className='bg-slate-500 text-white'>
					<tr className='text-center divide-x divide-slate-950'>
						<th className='px-4 py-3'>Id</th>
						<th className='px-4 py-3'>Title</th>
						<th className='px-4 py-3'>Completed</th>
						<th className='px-4 py-3'>User</th>
					</tr>
				</thead>
				<tbody className='divide-y divide-slate-950'>
					{todos.map((todo) => (
						<tr key={todo.id} className='text-center divide-x divide-slate-950 odd:bg-lime-200 even:bg-purple-200 font-mono'>
							<td className='px-4 py-2'>{todo.id}</td>
							<td className='px-4 py-2'>{todo.title}</td>
							<td className='px-4 py-2'>
								<input type="checkbox" defaultChecked={todo.completed}/>
							</td> 
							<td className='px-4 py-2'>{todo.user.name}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default App
