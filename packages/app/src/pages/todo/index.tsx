import {
	ClerkProvider,
	SignedIn,
	SignedOut,
	RedirectToSignIn,
	useUser,
	useSession,
} from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'
import React, { useState, useEffect, FormEvent } from 'react'

import Header from '../../sections/shared/Layout/AppLayout/Header'

import styles from './Home.module.css'

const supabaseClient = async (supabaseAccessToken: string) => {
	const supabase = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL as string,
		process.env.NEXT_PUBLIC_SUPABASE_KEY as string,
		{ global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } } }
	)
	return supabase
}

const TodoList = ({ todos, setTodos }: any) => {
	const { session } = useSession()
	const [loadingTodos, setLoadingTodos] = useState(true)

	useEffect(() => {
		const loadTodos = async () => {
			try {
				setLoadingTodos(true)
				const supabaseAccessToken = await session?.getToken({
					template: 'supabase',
				})
				const supabase = supabaseAccessToken && (await supabaseClient(supabaseAccessToken))
				const { data: todos }: any = supabase && (await supabase.from('todos').select('*'))
				setTodos(todos)
			} catch (e) {
				alert(e)
			} finally {
				setLoadingTodos(false)
			}
		}
		loadTodos()
	}, [])
	if (loadingTodos) {
		return <div className={styles.label}>Loading...</div>
	}

	return (
		<>
			{todos?.length > 0 ? (
				<div>
					<ol style={{ backgroundColor: 'white' }}>
						{todos.map((todo: any) => (
							<li key={todo.id}>{todo.title}</li>
						))}
					</ol>
				</div>
			) : (
				<div style={{ backgroundColor: 'white' }} className={styles.label}>
					You don&apos;t have any todos!
				</div>
			)}
		</>
	)
}

const AddTodoForm = ({ todos, setTodos }: any) => {
	const { session } = useSession()
	const [newTodo, setNewTodo] = useState('')
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (newTodo === '') {
			return
		}

		const supabaseAccessToken = await session?.getToken({
			template: 'supabase',
		})
		const supabase = supabaseAccessToken && (await supabaseClient(supabaseAccessToken))
		const { data }: any =
			supabase &&
			(await supabase.from('todos').insert({ title: newTodo, user_id: session?.user.id }).select())

		setTodos([...todos, data[0]])
		setNewTodo('')
	}

	return (
		<form onSubmit={handleSubmit}>
			<input onChange={(e) => setNewTodo(e.target.value)} value={newTodo} />
			&nbsp;<button>Add Todo</button>
		</form>
	)
}

const TodoHome: React.FC = () => {
	const [todos, setTodos] = useState<object[]>([])

	return (
		<ClerkProvider>
			<Header />
			<SignedIn>
				<main className={styles.main}>
					<div className={styles.container}>
						<AddTodoForm todos={todos} setTodos={setTodos} />
						<TodoList todos={todos} setTodos={setTodos} />
					</div>
				</main>
			</SignedIn>
			<SignedOut>
				<main className={styles.main}>
					<div className={styles.label}>You can enjoy your tasks after signin</div>
				</main>
			</SignedOut>
		</ClerkProvider>
	)
}

export default TodoHome
