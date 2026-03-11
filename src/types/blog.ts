export type BlogStatus = 'draft' | 'published' | 'archived';

export interface BlogCategory {
    id: string;
    name: string;
    slug: string;
    description?: string;
}

export interface BlogAuthor {
    id: string;
    name: string;
    avatar?: string;
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    featured_image?: string;
    status: BlogStatus;
    category_id?: string;
    author_id: string;
    category?: BlogCategory;
    author?: BlogAuthor;
    meta_title?: string;
    meta_description?: string;
    created_at: string;
    updated_at: string;
    views_count?: number;
    comments_count?: number;
}

export interface CreateBlogDto {
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    featured_image?: string;
    status?: BlogStatus;
    category_id?: string;
    meta_title?: string;
    meta_description?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
}

export interface UpdateBlogDto extends Partial<CreateBlogDto> { }

export interface CreateBlogCategoryDto {
    name: string;
    slug: string;
    description?: string;
}

export interface CreateBlogCommentDto {
    content: string;
    author_name: string;
    author_email: string;
}

export interface TrackBlogViewDto {
    referrer?: string;
    session_id?: string;
}
