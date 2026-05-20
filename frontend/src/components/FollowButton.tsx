    import { useState } from 'react';
    import { api } from '../api/axios';

    interface FollowButtonProps {
    username: string;
    initialIsFollowing?: boolean;
    }

    export function FollowButton({ username, initialIsFollowing = false }: FollowButtonProps) {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggleFollow = async () => {
        setIsLoading(true);
        try {
        const response = await api.post(`/users/${username}/follow/`);
        // A nossa API retorna action: "followed" ou "unfollowed"
        setIsFollowing(response.data.action === 'followed');
        } catch (error) {
        console.error('Erro ao alternar seguidor', error);
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <button 
        onClick={handleToggleFollow} 
        disabled={isLoading}
        style={{
            padding: '6px 16px',
            borderRadius: '20px',
            border: '1px solid #1d9bf0',
            backgroundColor: isFollowing ? 'white' : '#1d9bf0',
            color: isFollowing ? '#1d9bf0' : 'white',
            fontWeight: 'bold',
            cursor: isLoading ? 'not-allowed' : 'pointer'
        }}
        >
        {isFollowing ? 'Seguindo' : 'Seguir'}
        </button>
    );
    }