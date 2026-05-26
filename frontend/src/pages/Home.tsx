    // src/pages/Home.tsx
    import React, { type FormEvent, useEffect, useState } from 'react';
    import { api } from '../api/axios';
    import { TweetInteractions } from '../components/TweetInteractions';
    import { FollowButton } from '../components/FollowButton';

    // Importando os componentes estilizados que criamos no Passo 3
    import { FeedHeader, ComposeBox, ComposeTextArea, ComposeAction, TweetCard, TweetAuthor, TweetContent } from '../styles/FeedStyles';
    import { SubmitButton } from '../styles/AuthStyles'; 

    interface Tweet {
    id: number;
    author: number;
    author_username: string;
    content: string;
    created_at: string;
    likes_count: number;
    comments_count: number;
    }

    export const Home: React.FC = () => {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [newTweetContent, setNewTweetContent] = useState('');
    const [isPosting, setIsPosting] = useState(false);

    const fetchFeed = async () => {
        try {
        const response = await api.get('/tweets/feed/');
        setTweets(response.data.results);
        } catch (error) {
        console.error('Erro ao buscar o feed', error);
        }
    };

    useEffect(() => {
        fetchFeed();
    }, []);

    const handlePostTweet = async (e: FormEvent) => {
        e.preventDefault();
        if (!newTweetContent.trim()) return;

        setIsPosting(true);
        try {
        await api.post('/tweets/', { content: newTweetContent });
        setNewTweetContent(''); 
        fetchFeed(); 
        } catch (error) {
        console.error('Erro ao criar postagem', error);
        } finally {
        setIsPosting(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <>
        <FeedHeader>
            Página Inicial
        </FeedHeader>

        <ComposeBox>
            <form onSubmit={handlePostTweet} style={{ display: 'flex', flexDirection: 'column' }}>
            <ComposeTextArea
                value={newTweetContent}
                onChange={(e) => setNewTweetContent(e.target.value)}
                placeholder="E aí, qual a boa?"
                maxLength={280}
            />
            <ComposeAction style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: newTweetContent.length >= 280 ? 'red' : 'inherit' }}>
                {newTweetContent.length}/280
                </span>
                <SubmitButton 
                type="submit" 
                disabled={isPosting || !newTweetContent.trim()}
                style={{ width: 'auto', marginTop: 0, padding: '8px 24px' }} 
                >
                {isPosting ? 'Postando...' : 'Publicar'}
                </SubmitButton>
            </ComposeAction>
            </form>
        </ComposeBox>

        <div>
            {tweets.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '40px', opacity: 0.6 }}>
                O feed está vazio. Faça a sua primeira postagem!
            </p>
            ) : (
            tweets.map((tweet) => (
                <TweetCard key={tweet.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <TweetAuthor>@{tweet.author_username}</TweetAuthor>
                    <FollowButton username={tweet.author_username} />
                    </div>
                    <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{formatDate(tweet.created_at)}</span>
                </div>
                
                <TweetContent>{tweet.content}</TweetContent>
                
                <TweetInteractions 
                    tweetId={tweet.id} 
                    initialLikes={tweet.likes_count} 
                    initialComments={tweet.comments_count} 
                />
                </TweetCard>
            ))
            )}
        </div>
        </>
    );
    };