import { apiClient } from './api-client';
import {
    BlogPost,
    CreateBlogDto,
    UpdateBlogDto,
    BlogCategory,
    CreateBlogCategoryDto,
    CreateBlogCommentDto,
    TrackBlogViewDto
} from '../types/blog';

export const blogService = {
    // Public Endpoints
    getAllPublished: async (tenantSlug?: string): Promise<BlogPost[]> => {
        const response = await apiClient.get<BlogPost[]>('/blogs', {
            params: { tenantSlug }
        });
        return response.data;
    },

    getBySlug: async (blogSlug: string, tenantSlug?: string): Promise<BlogPost> => {
        const response = await apiClient.get<BlogPost>(`/blogs/post/${blogSlug}`, {
            params: { tenantSlug }
        });
        return response.data;
    },

    getById: async (id: string): Promise<BlogPost> => {
        const response = await apiClient.get<BlogPost>(`/blogs/${id}`);
        return response.data;
    },

    // Admin/Author Endpoints
    create: async (data: CreateBlogDto): Promise<BlogPost> => {
        const response = await apiClient.post<BlogPost>('/blogs', data);
        return response.data;
    },

    getAllAdmin: async (): Promise<BlogPost[]> => {
        const response = await apiClient.get<BlogPost[]>('/blogs/admin');
        return response.data;
    },

    update: async (id: string, data: UpdateBlogDto): Promise<BlogPost> => {
        const response = await apiClient.patch<BlogPost>(`/blogs/${id}`, data);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/blogs/${id}`);
    },

    // Categories
    getCategories: async (): Promise<BlogCategory[]> => {
        const response = await apiClient.get<BlogCategory[]>('/blogs/categories');
        return response.data;
    },

    createCategory: async (data: CreateBlogCategoryDto): Promise<BlogCategory> => {
        const response = await apiClient.post<BlogCategory>('/blogs/categories', data);
        return response.data;
    },

    // Tracking
    trackView: async (id: string, data: TrackBlogViewDto): Promise<void> => {
        await apiClient.post(`/blogs/${id}/track`, data);
    },

    // Comments
    addComment: async (id: string, data: CreateBlogCommentDto): Promise<any> => {
        const response = await apiClient.post(`/blogs/${id}/comments`, data);
        return response.data;
    },

    moderateComment: async (commentId: string, status: 'approved' | 'rejected' | 'pending'): Promise<any> => {
        const response = await apiClient.patch(`/blogs/comments/${commentId}/moderate`, { status });
        return response.data;
    }
};
