import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/api/firebase.js', () => ({
  db: {},
  storage: {}
}))

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(() => 'mockRef'),
  setDoc: vi.fn(() => Promise.resolve()),
  getDoc: vi.fn(),
  updateDoc: vi.fn(() => Promise.resolve())
}))

vi.mock('firebase/storage', () => ({
  ref: vi.fn(() => 'mockStorageRef'),
  uploadBytes: vi.fn(() => Promise.resolve()),
  getDownloadURL: vi.fn(() => Promise.resolve('https://example.com/avatar.jpg'))
}))

import {
  createUserProfile,
  getUserProfile,
  updateUserFavorites,
  updateUserAvatar,
  updateUserBg,
  uploadAvatarToStorage
} from '@/api/user.service'

import { setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { uploadBytes, getDownloadURL } from 'firebase/storage'

describe('user.service', () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  // ── createUserProfile ──
  describe('createUserProfile', () => {
    it('llama a setDoc con los datos correctos del usuario', async () => {
      await createUserProfile('uid-123', 'test@test.com', 'TestUser')

      expect(setDoc).toHaveBeenCalledWith('mockRef', {
        uid: 'uid-123',
        email: 'test@test.com',
        username: 'TestUser',
        role: 'customer',
        fav: [],
        profileImg: null,
        profileBg: 'linear-gradient(135deg, #7c3aed, #22d3ee)'
      })
    })
  })