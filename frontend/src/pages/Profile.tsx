    import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
    import { api } from '../api/axios';

    // Definindo o formato dos dados que o back-end nos envia
    interface UserProfile {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    bio: string | null;
    profile_picture: string | null;
    cover_picture: string | null;
    followers_count: number;
    following_count: number;
    }

    export function Profile() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    
    // Estados para o formulário
    const [bio, setBio] = useState('');
    const [firstName, setFirstName] = useState('');
    const [profilePicFile, setProfilePicFile] = useState<File | null>(null);

    // Busca os dados assim que o componente é montado na tela

    const fetchProfile = async () => {
        try {
        const response = await api.get('/users/me/');
        setProfile(response.data);
        // Preenche os campos do formulário com os dados atuais
        setBio(response.data.bio || '');
        setFirstName(response.data.first_name || '');
        } catch (error) {
        console.error('Erro ao carregar perfil', error);
        }
    };

    useEffect(() => {
        const loadInitialProfile = async () => {
        try {
            const response = await api.get('/users/me/');
            setProfile(response.data);
            setBio(response.data.bio || '');
            setFirstName(response.data.first_name || '');
        } catch (error) {
            console.error('Erro ao carregar perfil', error);
        }
        };

        void loadInitialProfile();
    }, []);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
        setProfilePicFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        // Como temos arquivos de imagem, usamos FormData em vez de JSON
        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('bio', bio);
        
        if (profilePicFile) {
        formData.append('profile_picture', profilePicFile);
        }

        try {
        // Usamos PATCH para atualizar apenas os campos enviados
        await api.patch('/users/me/', formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
        
        // Sai do modo de edição e recarrega os dados atualizados
        setIsEditing(false);
        setProfilePicFile(null);
        fetchProfile();
        } catch (error) {
        console.error('Erro ao atualizar perfil', error);
        }
    };

    if (!profile) return <p>Carregando...</p>;

    return (
        <div>
        {/* Capa e Foto de Perfil */}
        <div style={{ position: 'relative', marginBottom: '60px' }}>
            <div style={{ height: '150px', backgroundColor: '#cbd5e1', borderRadius: '8px' }}>
            {profile.cover_picture && (
                <img 
                src={`http://localhost:8000${profile.cover_picture}`} 
                alt="Capa" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                />
            )}
            </div>
            <div style={{ position: 'absolute', bottom: '-40px', left: '20px' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#94a3b8', border: '4px solid white', overflow: 'hidden' }}>
                {profile.profile_picture && (
                <img 
                    src={`http://localhost:8000${profile.profile_picture}`} 
                    alt="Perfil" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                )}
            </div>
            </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
            <h2 style={{ margin: '0' }}>{profile.first_name || profile.username}</h2>
            <p style={{ margin: '0', color: 'gray' }}>@{profile.username}</p>
            </div>
            <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancelar' : 'Editar Perfil'}
            </button>
        </div>

        <p>{profile.bio || 'Sem biografia.'}</p>
        
        <div style={{ display: 'flex', gap: '15px', color: 'gray', fontSize: '14px' }}>
            <span><strong>{profile.following_count}</strong> Seguindo</span>
            <span><strong>{profile.followers_count}</strong> Seguidores</span>
        </div>

        <hr style={{ margin: '20px 0' }} />

        {/* Formulário de Edição (Só aparece se isEditing for true) */}
        {isEditing && (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h3>Editar Dados</h3>
            
            <label>Nome de exibição</label>
            <input 
                type="text" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                placeholder="Seu nome"
            />

            <label>Biografia</label>
            <textarea 
                value={bio} 
                onChange={(e) => setBio(e.target.value)} 
                placeholder="Fale um pouco sobre você..."
                maxLength={160}
            />

            <label>Nova Foto de Perfil</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />

            <button type="submit" style={{ alignSelf: 'flex-start' }}>Salvar Alterações</button>
            </form>
        )}
        </div>
    );
    }