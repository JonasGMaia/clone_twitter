    import { useEffect, useState } from 'react';
    import { api } from '../api/axios';
    import { FollowButton } from './FollowButton';

    // Reaproveitamos a função para não quebrar a imagem de quem vamos listar
    const getImageUrl = (imagePath: string | null) => {
        if (!imagePath) return '';
        if (imagePath.startsWith('http')) return imagePath;
        return `http://localhost:8000${imagePath}`;
    };

    interface UserListProfile {
    id: number;
    username: string;
    first_name: string;
    profile_picture: string | null;
    is_following: boolean;
    }

    export function WhoToFollow() {
    const [users, setUsers] = useState<UserListProfile[]>([]);

    const fetchUsers = async () => {
        try {
        const response = await api.get('/users/all/');
        // Se a rota usar paginação, acesse response.data.results, senão use response.data
        setUsers(response.data.results || response.data);
        } catch (error) {
        console.error('Erro ao carregar lista de usuários:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // REPARE: Removemos a função handleFollow daqui, pois o FollowButton já cuida disso!

    return (
        <div style={{ 
            padding: '20px', 
            border: 'none', 
            borderRadius: '16px', 
            backgroundColor: 'none',
            width: '300px'
        }}>
        <h3 style={{ margin: '0 0 16px 0' }}>Quem seguir</h3>
        
        {users.length === 0 ? (
            <p style={{ color: 'gray', fontSize: '14px' }}>Nenhum outro usuário encontrado.</p>
        ) : (
            users.map((user) => (
            <div key={user.id} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                marginBottom: '15px' 
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img 
                    src={getImageUrl(user.profile_picture) || 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'} 
                    alt={user.username} 
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <strong style={{ fontSize: '15px' }}>{user.first_name || user.username}</strong>
                    <span style={{ color: 'gray', fontSize: '14px' }}>@{user.username}</span>
                </div>
                </div>
                
                {/* O SEU COMPONENTE CUSTOMIZADO ENTRA AQUI, BEM MAIS SIMPLES: */}
                <FollowButton username={user.username} initialIsFollowing={user.is_following} />
                
            </div>
            ))
        )}
        </div>
    );
    }