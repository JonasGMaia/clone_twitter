    import { useState } from 'react';
    import { api } from '../api/axios';

    interface TweetInteractionsProps {
    tweetId: number;
    initialLikes: number;
    initialComments: number;
    }

    export function TweetInteractions({ tweetId, initialLikes, initialComments }: TweetInteractionsProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(false); // Estado local simplificado
    const [isLoading, setIsLoading] = useState(false);

    const handleLike = async () => {
        if (isLoading) return;
        setIsLoading(true);

        try {
        const response = await api.post(`/tweets/${tweetId}/like/`);
        
        if (response.data.status === 'liked') {
            setLikes(prev => prev + 1);
            setIsLiked(true);
        } else {
            setLikes(prev => prev - 1);
            setIsLiked(false);
        }
        } catch (error) {
        console.error('Erro ao curtir', error);
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', gap: '30px', fontSize: '14px', color: 'gray', marginTop: '10px' }}>
        {/* Botão de Comentário */}
        <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
            💬 <span>{initialComments}</span>
        </div>

        {/* Botão de Curtida */}
        <div 
            onClick={handleLike} 
            style={{ 
            cursor: isLoading ? 'wait' : 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '5px',
            color: isLiked ? '#f91880' : 'gray' 
            }}
        >
            {isLiked ? '❤️' : '🤍'} <span>{likes}</span>
        </div>
        </div>
    );
    }