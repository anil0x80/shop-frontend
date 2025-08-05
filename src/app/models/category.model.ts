export interface CategoryTaxRequest {
  taxId: string;
  taxPercent: number;
}

export interface CategoryTaxResponse {
  id: string;
  taxId: string;
  taxPercent: number;
  // Add other tax response properties as needed
}

export interface CreateCategoryRequest {
  categoryName: string;
  taxes: CategoryTaxRequest[];
}

export interface UpdateCategoryRequest {
  id: string;
  categoryName: string;
  taxes: CategoryTaxRequest[];
}

export interface CategoryResponse {
  id: string;
  categoryName: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  taxes: CategoryTaxResponse[];
}
