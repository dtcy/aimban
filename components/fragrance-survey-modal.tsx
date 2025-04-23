"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

type FragranceType = {
  id: string
  name: string
  description: string
}

const fragranceTypes: FragranceType[] = [
  {
    id: "floral",
    name: "플로럴 계열 Floral",
    description: "꽃향기 중심의 부드럽고 우아한 향 (장미, 라벤더, 자스민)",
  },
  {
    id: "citrus",
    name: "시트러스 계열 Citrus",
    description: "상큼하고 활기찬 과일향 (레몬, 오렌지, 자몽)",
  },
  {
    id: "herb",
    name: "허브/그린 계열 Herb/Green",
    description: "자연적이고 신선한 풀내음 (로즈마리, 민트, 바질)",
  },
  {
    id: "woody",
    name: "우디 계열 Woody",
    description: "따뜻하고 안정감 있는 나무 향 (샌달우드, 시더우드, 파출리)",
  },
  {
    id: "oriental",
    name: "오리엔탈 Oriental",
    description: "이국적이고 달콤한 스파이시 향 (바닐라, 앰버, 머스크)",
  },
  {
    id: "spice",
    name: "스파이스 계열 Spice",
    description: "강렬하고 따뜻한 향신료 중심 (계피, 정향, 후추)",
  },
  {
    id: "fruity",
    name: "프루티 계열 (Fruity)",
    description: "달콤하고 상큼한 과일향 (복숭아, 딸기, 사과)",
  },
  {
    id: "aquatic",
    name: "아쿠아틱 Aquatic",
    description: "시원하고 깨끗한 물과 바다의 느낌 (바닷바람, 수련, 청량한 워터)",
  },
  {
    id: "smoky",
    name: "스모키/레더 Smoky/Leather",
    description: "스모키하거나 가죽의 중후한 향 (타르, 담배 잎, 가죽)",
  },
]

export default function FragranceSurveyModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    birthdate: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    selectedFragrance: "",
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // 에러 메시지 지우기
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleFragranceSelect = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedFragrance: id,
    }))

    if (errors.selectedFragrance) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.selectedFragrance
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "이름을 입력해주세요"
    if (!formData.gender) newErrors.gender = "성별을 선택해주세요"
    if (!formData.birthdate) newErrors.birthdate = "생년월일을 입력해주세요"
    if (!formData.phone) newErrors.phone = "연락처를 입력해주세요"
    if (!formData.email) newErrors.email = "이메일을 입력해주세요"
    if (!formData.address1) newErrors.address1 = "주소를 입력해주세요"
    if (!formData.selectedFragrance) newErrors.selectedFragrance = "선호하는 향을 선택해주세요"
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "개인정보 수집에 동의해주세요"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // 여기서 폼 데이터 제출 처리
      console.log("제출된 데이터:", formData)
      alert("향 선호도 조사에 참여해주셔서 감사합니다! 이벤트 상품 지급을 위해 연락드리겠습니다.")
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-200 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-200 p-4 flex justify-between items-center border-b border-gray-300 z-10">
          <h2 className="text-2xl font-bold text-center flex-grow">향 선호도 조사 EVENT</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-300 transition-colors" aria-label="닫기">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* 기본 정보 섹션 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">
                  이름<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="이름을 입력해주세요."
                  className="w-full p-3 border border-gray-300 rounded"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  성별<span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="남"
                      checked={formData.gender === "남"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="male">남</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="여"
                      checked={formData.gender === "여"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="female">여</label>
                  </div>
                </div>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="birthdate" className="block mb-2 font-medium">
                  생년월일<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="birthdate"
                  name="birthdate"
                  placeholder="생년월일 6자리 입력해주세요."
                  className="w-full p-3 border border-gray-300 rounded"
                  value={formData.birthdate}
                  onChange={handleChange}
                />
                {errors.birthdate && <p className="text-red-500 text-sm mt-1">{errors.birthdate}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block mb-2 font-medium">
                  연락처<span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="01012341234"
                  className="w-full p-3 border border-gray-300 rounded"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 font-medium">
                이메일<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="user@wellthykorea.kr"
                className="w-full p-3 border border-gray-300 rounded"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="address1" className="block mb-2 font-medium">
                주소<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="address1"
                name="address1"
                placeholder="주소를 입력해주세요."
                className="w-full p-3 border border-gray-300 rounded mb-2"
                value={formData.address1}
                onChange={handleChange}
              />
              <input
                type="text"
                id="address2"
                name="address2"
                placeholder="상세주소 입력해주세요."
                className="w-full p-3 border border-gray-300 rounded"
                value={formData.address2}
                onChange={handleChange}
              />
              {errors.address1 && <p className="text-red-500 text-sm mt-1">{errors.address1}</p>}
            </div>

            <div className="border-t border-gray-300 pt-6">
              <h3 className="text-lg font-bold mb-4">
                평소 선호하는 향 선택<span className="text-red-500">*</span>
              </h3>

              <div className="space-y-3">
                {fragranceTypes.map((fragrance) => (
                  <div
                    key={fragrance.id}
                    className={`p-3 border rounded cursor-pointer transition-colors ${
                      formData.selectedFragrance === fragrance.id
                        ? "bg-primary text-white border-primary"
                        : "bg-white border-gray-300 hover:bg-gray-100"
                    }`}
                    onClick={() => handleFragranceSelect(fragrance.id)}
                  >
                    <div className="flex items-center">
                      <div className="mr-2">
                        <div
                          className={`w-5 h-5 rounded-full border ${
                            formData.selectedFragrance === fragrance.id ? "border-white bg-white" : "border-gray-400"
                          } flex items-center justify-center`}
                        >
                          {formData.selectedFragrance === fragrance.id && (
                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">{fragrance.name}</p>
                        <p
                          className={`text-sm ${formData.selectedFragrance === fragrance.id ? "text-gray-100" : "text-gray-600"}`}
                        >
                          {fragrance.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.selectedFragrance && <p className="text-red-500 text-sm mt-2">{errors.selectedFragrance}</p>}
            </div>

            <div className="pt-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-1 mr-2"
                />
                <label htmlFor="agreeToTerms" className="text-sm">
                  개인정보처리방침(전문보기) 동의
                </label>
              </div>
              {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-md font-bold hover:bg-primary-dark transition-colors"
              >
                제출하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

