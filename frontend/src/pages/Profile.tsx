    // src/pages/Profile.tsx
    import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
    import { api } from '../api/axios';
    import { 
    ProfileContainer, CoverBlock, AvatarBlock, ActionRow, 
    InfoBlock, DisplayName, Username, BioText, StatsRow 
    } from '../styles/ProfileStyles';
    import { SubmitButton, InputGroup, Label, Input } from '../styles/AuthStyles';
    import { ComposeTextArea } from '../styles/FeedStyles'; // Reutilizando a área de texto do feed

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

    const getImageUrl = (imagePath: string | null) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) {
        return imagePath;
    }
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
    return `${baseUrl}${imagePath}`;
};

    export function Profile() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    
    const [bio, setBio] = useState('');
    const [firstName, setFirstName] = useState('');
    const [profilePicFile, setProfilePicFile] = useState<File | null>(null);

    const fetchProfile = async () => {
        try {
        const response = await api.get('/users/me/');
        setProfile(response.data);
        setBio(response.data.bio || '');
        setFirstName(response.data.first_name || '');
        } catch (error) {
        console.error('Erro ao carregar perfil', error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        fetchProfile();
        
    }, []);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
        setProfilePicFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('bio', bio);
        
        if (profilePicFile) {
        formData.append('profile_picture', profilePicFile);
        }

        try {
        await api.patch('/users/me/', formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
        
        setIsEditing(false);
        setProfilePicFile(null);
        fetchProfile();
        } catch (error) {
        console.error('Erro ao atualizar perfil', error);
        }
    };

    if (!profile) return <ProfileContainer>Carregando suas informações...</ProfileContainer>;

    return (
        <>
            <CoverBlock>
            {profile.cover_picture && (
            <img src={getImageUrl(profile.cover_picture)} alt="Capa" />
            )}
            <AvatarBlock>
            {profile.profile_picture && (
                <img src={getImageUrl(profile.profile_picture)} alt="Perfil" />
            )}
            </AvatarBlock>
        </CoverBlock>

        <ActionRow>
            <SubmitButton 
            style={{ width: 'auto', marginTop: 0, padding: '8px 16px', fontSize: '0.9rem' }} 
            onClick={() => setIsEditing(!isEditing)}
            >
            {isEditing ? 'Cancelar' : 'Editar Perfil'}
            </SubmitButton>
        </ActionRow>

        <InfoBlock>
            <DisplayName>{profile.first_name || profile.username}</DisplayName>
            <Username>@{profile.username}</Username>
            
            <BioText>{profile.bio || 'Esta é a bio. Fale sobre você!'}</BioText>
            
            <StatsRow>
            <span><strong>{profile.following_count}</strong> Seguindo</span>
            <span><strong>{profile.followers_count}</strong> Seguidores</span>
            </StatsRow>
        </InfoBlock>

        {isEditing && (
            <ProfileContainer>
            <form onSubmit={handleSubmit}>
                <h3 style={{ marginBottom: '16px', textTransform: 'uppercase' }}>Editar Dados</h3>
                
                <InputGroup>
                <Label>Nome de exibição</Label>
                <Input 
                    type="text" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    placeholder="O seu nome"
                />
                </InputGroup>

                <InputGroup>
                <Label>Biografia</Label>
                <ComposeTextArea 
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)} 
                    placeholder="Fale um pouco sobre você..."
                    maxLength={160}
                    style={{ border: '2px solid #1A1A1A' }}
                />
                </InputGroup>

                <InputGroup>
                <Label>Nova Foto de Perfil</Label>
                <Input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    style={{ padding: '8px' }}
                />
                </InputGroup>

                <SubmitButton type="submit">Salvar Alterações</SubmitButton>
            </form>
            </ProfileContainer>
        )}
        </>
    );
    }