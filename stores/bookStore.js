import zustand, { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import stories from '../assets/stories.json'
import { getSimpleId } from "../lib/utils"

/*
Generate a simulated conversation between the Scarecrow and Dorothy in which they discuss their journey to Oz and their plans for the future.

Generate a simulated conversation between the Scarecrow and the Tin Man in which they debate the merits of having a brain vs. having a heart.
*/

const useBookStore = create(
    persist(
        (set, get) => ({

            books: stories.books,
            chapters: stories.chapters,
            characters: stories.characters,
            users: stories.users,
            
            bookId: stories.books[0].id,//'str0003', //'str0002', //stories.books[0].id,
            chapterId: stories.chapters[0].id,//'cha0004', //'cha0003', //stories.chapters[0].id,
            characterId: stories.characters[0].id,//'chr0004', //'chr0003', //stories.characters[0].id,

            selectBook: (book_id) => {

                const chapters = get().chapters.filter((item) => item.sid === book_id)
                const characters = get().characters.filter((item) => item.sid === book_id)

                const chapter_id = chapters[0].id
                const character_id = characters[0].id

                set({ bookId: book_id, chapterId: chapter_id, characterId: character_id })

            },
            selectChapter: (chapter_id) => set({ chapterId: chapter_id }),
            selectCharacter: (character_id) => set({ characterId: character_id }),

            addBook: (bookName, prompt) => {
                
                let books = get().books.slice(0)
                let chapters = get().chapters.slice(0)
                let characters = get().characters.slice(0)
                let users = get().users.slice(0)

                let book_id = getSimpleId()
                let chapter_id = getSimpleId()
                let character_id = getSimpleId()
                let user_id = getSimpleId()

                books.push({
                    id: book_id,
                    name: bookName,
                    prompt,
                })

                chapters.push({ 
                    sid: book_id, 
                    id: chapter_id, 
                    name: "Untitled Scene",
                    prompt: "",
                    characters: [],
                    user: ""
                })

                characters.push({
                    sid: book_id,
                    id: character_id,
                    icon: 0,
                    name: "Assistant",
                    prompt: "You will act as a helpful assistant."
                })

                users.push({
                    sid: book_id,
                    id: user_id,
                    name: "User",
                    prompt: ""
                },)

                set({ books, chapters, characters, users })

                return book_id

            },
            editBook: (book_id, book) => {

                let books = get().books.slice(0)

                books = books.map((item) => {
                    if(item.id === book_id) item = book
                    return {
                        ...item,
                    }
                })

                set({ books })

            },
            deleteBook: (book_id) => {

                let books = get().books.slice(0)
                books = books.filter((item) => item.id !== book_id)

                let chapters = get().chapters.slice(0)
                chapters = chapters.filter((item) => item.sid !== book_id)

                let characters = get().characters.slice(0)
                characters = characters.filter((item) => item.sid !== book_id)

                let users = get().users.slice(0)
                users = users.filter((item) => item.sid !== book_id)

                set({ books, chapters, characters, users })

            },
            getBook: (id) => get().books.find((item) => item.id === id),
            
            addChapter: (book_id, name, prompt) => {
                
                let chapter_id = getSimpleId()

                let chapters = get().chapters.slice(0)

                chapters.push({ 
                    sid: book_id, 
                    id: chapter_id, 
                    name: name,
                    prompt: prompt,
                    characters: [],
                    user: ""
                })

                set({ chapters })

                return chapter_id

            },
            editChapter: (chapter_id, chapter) => {

                let chapters = get().chapters.slice(0)

                chapters = chapters.map((item) => {
                    if(item.id === chapter_id) item = chapter
                    return {
                        ...item,
                    }
                })

                set({ chapters })

            },
            deleteChapter: (chapter_id) => {

                let chapters = get().chapters.slice(0)

                chapters = chapters.filter((item) => item.id !== chapter_id)

                set({ chapters })

            },
            getChapters: (book_id) => get().chapters.filter((item) => item.sid === book_id),
            getChapter: (chapter_id) => get().chapters.find((item) => item.id === chapter_id),

            addCharacter: (book_id, name, icon, prompt) => {

                let character_id = getSimpleId()

                let characters = get().characters.slice(0)

                characters.push({ 
                    sid: book_id, 
                    id: character_id, 
                    name,
                    icon,
                    prompt,
                })

                set({ characters })

                return character_id

            },
            editCharacter: (character_id, character) => {
                
                let characters = get().characters.slice(0)

                characters = characters.map((item) => {
                    if(item.id === character_id) item = character
                    return {
                        ...item,
                    }
                })

                set({ characters })

            },
            deleteCharacter: (character_id) => {

                let characters = get().characters.slice(0)

                characters = characters.filter((item) => item.id !== character_id)

                set({ characters })

            },
            getCharacters: (book_id) => get().characters.filter((item) => item.sid === book_id),
            getCharacter: (character_id) => get().characters.find((item) => item.id === character_id),

            editUser: (book_id, user) => {

                let users = get().users.slice(0)

                users = users.map((item) => {
                    if(item.sid === book_id) item = user
                    return {
                        ...item,
                    }
                })

                set({ users })

            },
            getUserByBookId: (book_id) => get().users.find((item) => item.sid === book_id),

        }),
        {
            name: "openai-chatgpt-book-storage",
            storage: createJSONStorage(() => localStorage),
            version: 1,
        }
    )
)

export default useBookStore