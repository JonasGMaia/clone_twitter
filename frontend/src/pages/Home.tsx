    import React, { FormEvent, useEffect, useState } from 'react';
    import { api } from '../api/axios';
    import { TweetInteractions } from '../components/TweetInteractions';
import { FollowButton } from '../components/FollowButton';

    // 1. Tipagem baseada no Serializer que criamos no back-end
    interface Tweet {
    id: number;
    author: number;
    author_username: string;
    content: string;
    created_at: string;
    likes_count: number;
    comments_count: number;
    }

    export function Home() {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [newTweetContent, setNewTweetContent] = useState('');
    const [isPosting, setIsPosting] = useState(false);

    // 2. Busca o feed
    const fetchFeed = async () => {
        try {
        const response = await api.get('/tweets/feed/');
        // Atenção aqui: acessamos '.data.results' por causa da paginação do Django!
        setTweets(response.data.results);
        } catch (error) {
        console.error('Erro ao buscar o feed', error);
        }
    };

    useEffect(() => {
        fetchFeed();
    }, []);

    // 3. Envia um novo tweet
    const handlePostTweet = async (e: FormEvent) => {
        e.preventDefault();
        if (!newTweetContent.trim()) return;

        setIsPosting(true);
        try {
        await api.post('/tweets/', { content: newTweetContent });
        setNewTweetContent(''); // Limpa o formulário
fetchFeed(); // Busca o feed atualizado com o tweet novo
        } catch (error) {
        console.error('Erro ao criar postagem', error);
        } finally {
        setIsPosting(false);
        }
    };

    // Função auxiliar para formatar a data
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div>
        <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '15px', marginTop: 0 }}>Página Inicial</h2>

        {/* Caixa de Nova Postagem */}
        <form onSubmit={handlePostTweet} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
            <textarea
            value={newTweetContent}
            onChange={(e) => setNewTweetContent(e.target.value)}
            placeholder="O que está acontecendo?"
            maxLength={280}
            style={{ width: '100%', minHeight: '80px', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', resize: 'vertical' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <small style={{ color: newTweetContent.length >= 280 ? 'red' : 'gray' }}>
                {newTweetContent.length}/280
            </small>
            <button 
                type="submit" 
                disabled={isPosting || !newTweetContent.trim()}
                style={{ padding: '8px 16px', backgroundColor: '#1d9bf0', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}
            >
                {isPosting ? 'Postando...' : 'Postar'}
            </button>
            </div>
        </form>

        {/* Feed de Postagens */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {tweets.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'gray', marginTop: '40px' }}>
                Seu feed está vazio. Que tal seguir algumas pessoas ou fazer sua primeira postagem?
            </p>
            ) : (
            tweets.map((tweet) => (
                <div key={tweet.id} style=
                {{ padding: '15px 0', borderBottom: '1px solid #eee' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <strong>@{tweet.author_username}</strong>
                    <FollowButton username={tweet.author_username} />
                </div>
                    <span style={{ fontSize: '12px', color: 'gray' }}>{formatDate(tweet.created_at)}</span>
                </div>
                <p style={{ margin: '5px 0 10px 0', wordBreak: 'break-word' }}>{tweet.content}</p>
                
                {/* substituição das interações */}
                <TweetInteractions 
                tweetId={tweet.id} 
                initialLikes={tweet.likes_count} 
                initialComments={tweet.comments_count} 
                />
                </div>
            ))
            )}
        </div>
        </div>
    );
    }