import { create } from "zustand"
import {persist} from "zustand/middleware"

interface UserData {
  data: object | null
  setData: (_data: object) => void
  logOut: () => void
}

const userData = create<UserData>()(
  persist(
    (set, get) => ({
      data: null,
      setData: (_data: object) => set(() => ({ data: _data })),
      logOut: () => set(() => ({ data: null })),
    }),
    { name: "userData" }
  )
)

export {userData}