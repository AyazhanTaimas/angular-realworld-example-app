import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ArticleListConfig } from '../models/article-list-config.model';
import { Article } from '../models/article.model';

const mockArticles: Article[] = [
  {
    slug: 'article-1',
    title: 'Mock Article 1',
    description: 'This is a mock description for article 1.',
    body: 'This is the content of the mock article 1.',
    tagList: ['angular', 'rxjs', 'mock'],
    createdAt: '2024-12-20',
    updatedAt: '2024-12-20',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: 'mockuser',
      bio: 'Mock bio.',
      image: 'https://i.imgur.com/DPkZg0R.png',
      following: false
    }
  },
  {
    slug: 'article-2',
    title: 'Mock Article 2',
    description: 'This is a mock description for article 2.',
    body: 'This is the content of the mock article 2.',
    tagList: ['angular', 'testing', 'mock'],
    createdAt: '2024-12-21',
    updatedAt: '2024-12-21',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: 'mockuser2',
      bio: 'Another mock bio.',
      image: 'https://i.imgur.com/DPkZg0R.png',
      following: false
    }
  }
];

@Injectable({ providedIn: 'root' })
export class ArticlesService {
  constructor() {}

  query(config: ArticleListConfig): Observable<{ articles: Article[]; articlesCount: number }> {
    return of({
      articles: mockArticles,
      articlesCount: mockArticles.length
    });
  }

  get(slug: string): Observable<Article | null> {
    const article = mockArticles.find((a) => a.slug === slug) || null;
    return of(article);
  }

  delete(slug: string): Observable<void> {
    return of();
  }

  create(article: Partial<Article>): Observable<Article> {
    const newArticle: Article = {
      ...article,
      slug: 'new-article',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favorited: false,
      favoritesCount: 0,
      author: {
        username: 'mockuser',
        bio: 'Mock bio.',
        image: 'https://i.imgur.com/DPkZg0R.png',
        following: false
      }
    } as Article;
    mockArticles.push(newArticle);
    return of(newArticle);
  }

  update(article: Partial<Article>): Observable<Article | null> {
    const existingArticle = mockArticles.find((a) => a.slug === article.slug);
    if (existingArticle) {
      Object.assign(existingArticle, article);
      existingArticle.updatedAt = new Date().toISOString();
      return of(existingArticle);
    }
    return of(null);
  }

  favorite(slug: string): Observable<Article | null> {
    const article = mockArticles.find((a) => a.slug === slug);
    if (article) {
      article.favorited = true;
      article.favoritesCount++;
      return of(article);
    }
    return of(null);
  }

  unfavorite(slug: string): Observable<void> {
    const article = mockArticles.find((a) => a.slug === slug);
    if (article) {
      article.favorited = false;
      article.favoritesCount--;
    }
    return of();
  }
}
