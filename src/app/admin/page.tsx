"use client";

import { useState, useEffect } from 'react';
import styles from './Admin.module.css';
import { Save, Plus, Trash2, Upload, ChevronRight, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { getIcon } from '@/lib/iconMap';

export default function AdminPage() {
    const [data, setData] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('projects');
    const [isSaving, setIsSaving] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        // Check if already logged in
        if (localStorage.getItem('adminAuth') === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetch('/api/content')
                .then(res => res.json())
                .then(val => setData(val));
        }
    }, [isAuthenticated]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError('');
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });
            const result = await res.json();
            if (result.success) {
                setIsAuthenticated(true);
                localStorage.setItem('adminAuth', 'true');
            } else {
                setLoginError(result.error);
            }
        } catch (error) {
            setLoginError('Login failed');
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.ok) alert('Saved successfully!');
        } catch (error) {
            alert('Failed to save');
        } finally {
            setIsSaving(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, path: string[]) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            const result = await res.json();
            if (result.success) {
                updateData(path, result.url);
            }
        } catch (error) {
            alert('Upload failed');
        }
    };

    const updateData = (path: string[], value: any) => {
        const newData = { ...data };
        let current = newData;
        for (let i = 0; i < path.length - 1; i++) {
            current = current[path[i]];
        }
        current[path[path.length - 1]] = value;
        setData(newData);
    };

    const addItem = (section: string, template: any) => {
        const newData = { ...data };
        newData[section] = [...newData[section], { ...template, id: Date.now().toString() }];
        setData(newData);
    };

    const removeItem = (section: string, index: number) => {
        const newData = { ...data };
        newData[section] = newData[section].filter((_: any, i: number) => i !== index);
        setData(newData);
    };

    const TagEditor = ({ tags, onUpdate }: { tags: string[], onUpdate: (newTags: string[]) => void }) => {
        const [newTag, setNewTag] = useState('');

        return (
            <div className={styles.tagEditor}>
                <div className={styles.tagsList}>
                    {tags?.map((tag, i) => (
                        <span key={i} className={styles.tagItem}>
                            {tag}
                            <button className={styles.removeTag} onClick={() => onUpdate(tags.filter((_, idx) => idx !== i))}>
                                <X size={12} />
                            </button>
                        </span>
                    ))}
                </div>
                <div className={styles.addTagGroup}>
                    <input
                        className={styles.addTagInput}
                        value={newTag}
                        placeholder="Add new tag/item..."
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                onUpdate([...(tags || []), newTag]);
                                setNewTag('');
                            }
                        }}
                    />
                    <button className={styles.addButton} onClick={() => {
                        onUpdate([...(tags || []), newTag]);
                        setNewTag('');
                    }}>Add</button>
                </div>
            </div>
        );
    };

    if (!isAuthenticated) {
        return (
            <div className={styles.adminPage}>
                <Navbar />
                <div className={styles.loginContainer}>
                    <div className={styles.loginCard}>
                        <h2>Admin Login</h2>
                        <p>Enter your credentials to manage your portfolio.</p>
                        <form className={styles.loginForm} onSubmit={handleLogin}>
                            <input
                                className={styles.loginInput}
                                type="text"
                                placeholder="Username"
                                value={loginData.username}
                                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                                required
                            />
                            <input
                                className={styles.loginInput}
                                type="password"
                                placeholder="Password"
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                required
                            />
                            <button className={styles.loginButton} type="submit">Login</button>
                            {loginError && <p className={styles.errorMessage}>{loginError}</p>}
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    if (!data) return <div className={styles.loading}>Loading Dashboard...</div>;

    const tabs = [
        { id: 'hero', label: 'Hero Section' },
        { id: 'about', label: 'About Me' },
        { id: 'projects', label: 'Projects' },
        { id: 'achievements', label: 'Achievements' },
        { id: 'ventures', label: 'Ventures' },
        { id: 'social', label: 'Social Works' },
        { id: 'skills', label: 'Skills' }
    ];

    const isGlobalTab = activeTab === 'hero' || activeTab === 'about';

    return (
        <div className={styles.adminPage}>
            <Navbar />

            <div className={styles.container}>
                <header className={styles.header}>
                    <div>
                        <h1>Portfolio <span className="text-gradient">Control Panel</span></h1>
                        <p>Manage your projects, achievements and social impact.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            className={styles.saveButton}
                            style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'white' }}
                            onClick={() => {
                                localStorage.removeItem('adminAuth');
                                setIsAuthenticated(false);
                            }}
                        >
                            Logout
                        </button>
                        <button
                            className={styles.saveButton}
                            onClick={handleSave}
                            disabled={isSaving}
                        >
                            {isSaving ? 'Saving...' : <><Save size={18} /> Save All Changes</>}
                        </button>
                    </div>
                </header>

                <div className={styles.dashboard}>
                    <aside className={styles.sidebar}>
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={activeTab === tab.id ? styles.activeTab : styles.tab}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                                <ChevronRight size={16} />
                            </button>
                        ))}
                    </aside>

                    <main className={styles.editor}>
                        <div className={styles.editorHeader}>
                            <h2>Editing {tabs.find(t => t.id === activeTab)?.label}</h2>
                            {!isGlobalTab && (
                                <button
                                    className={styles.addButton}
                                    onClick={() => {
                                        if (activeTab === 'projects') addItem('projects', { title: 'New Project', description: '', tags: [], image: '', github: '#', link: '#' });
                                        if (activeTab === 'achievements') addItem('achievements', { title: 'New Achievement', description: '', year: '2024', icon: 'Trophy', image: '' });
                                        if (activeTab === 'social') addItem('social', { title: 'New Social Work', description: '', impact: '', icon: 'Heart', image: '' });
                                        if (activeTab === 'skills') addItem('skills', { name: 'New Skills Category', items: [], icon: 'Code', image: '' });
                                        if (activeTab === 'ventures') addItem('ventures', { title: 'New Venture', description: '', longDescription: '', role: '', status: '', year: '', image: '' });
                                    }}
                                >
                                    <Plus size={18} /> Add New
                                </button>
                            )}
                        </div>

                        <div className={styles.itemsList}>
                            {isGlobalTab ? (
                                <div className={styles.itemCard}>
                                    {Object.entries(data[activeTab]).map(([key, value]: [string, any]) => (
                                        <div key={key} className={styles.fieldGroup}>
                                            <label>{key}</label>
                                            {Array.isArray(value) ? (
                                                value.length > 0 && typeof value[0] === 'object' ? (
                                                    <div className={styles.nestedItems}>
                                                        {value.map((obj, i) => (
                                                            <div key={i} className={styles.itemCard} style={{ marginBottom: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                                                                {Object.entries(obj).map(([objKey, objVal]) => (
                                                                    <div key={objKey} className={styles.fieldGroup}>
                                                                        <label style={{ fontSize: '0.7rem' }}>{objKey}</label>
                                                                        <input
                                                                            value={objVal as string}
                                                                            onChange={(e) => {
                                                                                const newArray = [...value];
                                                                                newArray[i] = { ...newArray[i], [objKey]: e.target.value };
                                                                                updateData([activeTab, key], newArray);
                                                                            }}
                                                                            className={styles.addTagInput}
                                                                        />
                                                                    </div>
                                                                ))}
                                                                <button
                                                                    className={styles.deleteButton}
                                                                    onClick={() => updateData([activeTab, key], value.filter((_, idx) => idx !== i))}
                                                                >
                                                                    <Trash2 size={14} /> Remove Item
                                                                </button>
                                                            </div>
                                                        ))}
                                                        <button
                                                            className={styles.addButton}
                                                            onClick={() => {
                                                                const template = { ...value[0] };
                                                                Object.keys(template).forEach(k => template[k] = '');
                                                                updateData([activeTab, key], [...value, template]);
                                                            }}
                                                        >
                                                            <Plus size={14} /> Add {key.slice(0, -1)}
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <TagEditor
                                                        tags={value}
                                                        onUpdate={(newTags) => updateData([activeTab, key], newTags)}
                                                    />
                                                )
                                            ) : typeof value === 'string' ? (
                                                key.includes('image') || key.includes('logo') || key.includes('photo') ? (
                                                    <div className={styles.imageUpload}>
                                                        {value && <img src={value} alt="Preview" />}
                                                        <label className={styles.uploadBtn}>
                                                            <Upload size={16} /> {value ? 'Change Image' : 'Upload Image'}
                                                            <input
                                                                type="file"
                                                                onChange={(e) => handleImageUpload(e, [activeTab, key])}
                                                                hidden
                                                            />
                                                        </label>
                                                    </div>
                                                ) : key.includes('description') || key.includes('text') ? (
                                                    <textarea
                                                        value={value}
                                                        onChange={(e) => updateData([activeTab, key], e.target.value)}
                                                    />
                                                ) : (
                                                    <input
                                                        value={value}
                                                        onChange={(e) => updateData([activeTab, key], e.target.value)}
                                                        className={styles.titleInput}
                                                    />
                                                )
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            ) : data[activeTab].map((item: any, index: number) => (
                                <div key={item.id || index} className={styles.itemCard}>
                                    <div className={styles.cardHeader}>
                                        <input
                                            value={item.title || item.name}
                                            onChange={(e) => updateData([activeTab, index.toString(), item.title ? 'title' : 'name'], e.target.value)}
                                            className={styles.titleInput}
                                        />
                                        <button
                                            className={styles.deleteButton}
                                            onClick={() => removeItem(activeTab, index)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    <div className={styles.cardBody}>
                                        {item.description !== undefined && (
                                            <div className={styles.fieldGroup}>
                                                <label>Description</label>
                                                <textarea
                                                    value={item.description}
                                                    onChange={(e) => updateData([activeTab, index.toString(), 'description'], e.target.value)}
                                                />
                                            </div>
                                        )}

                                        {item.icon !== undefined && (
                                            <div className={styles.fieldGroup}>
                                                <label>Icon (Available: Trophy, Zap, Star, Award, Laptop, Rocket, Cpu, Code, Users, Heart, Handshake, Target, Layout)</label>
                                                <div className={styles.iconInputGroup}>
                                                    <div className={styles.iconPreview}>
                                                        {getIcon(item.icon)}
                                                    </div>
                                                    <input
                                                        value={item.icon}
                                                        onChange={(e) => updateData([activeTab, index.toString(), 'icon'], e.target.value)}
                                                        className={styles.addTagInput}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {item.tags !== undefined && (
                                            <div className={styles.fieldGroup}>
                                                <label>Tags</label>
                                                <TagEditor
                                                    tags={item.tags}
                                                    onUpdate={(newTags) => updateData([activeTab, index.toString(), 'tags'], newTags)}
                                                />
                                            </div>
                                        )}

                                        {item.items !== undefined && (
                                            <div className={styles.fieldGroup}>
                                                <label>Skills / Items</label>
                                                <TagEditor
                                                    tags={item.items}
                                                    onUpdate={(newItems) => updateData([activeTab, index.toString(), 'items'], newItems)}
                                                />
                                            </div>
                                        )}

                                        <div className={styles.fieldGroup}>
                                            <label>Photo / Image</label>
                                            <div className={styles.imageUpload}>
                                                {item.image && <img src={item.image} alt="Preview" />}
                                                <label className={styles.uploadBtn}>
                                                    <Upload size={16} /> {item.image ? 'Change Image' : 'Upload Image'}
                                                    <input
                                                        type="file"
                                                        onChange={(e) => handleImageUpload(e, [activeTab, index.toString(), 'image'])}
                                                        hidden
                                                    />
                                                </label>
                                            </div>
                                        </div>

                                        {item.longDescription !== undefined && (
                                            <div className={styles.fieldGroup}>
                                                <label>Deep-dive Description (for modals)</label>
                                                <textarea
                                                    value={item.longDescription}
                                                    onChange={(e) => updateData([activeTab, index.toString(), 'longDescription'], e.target.value)}
                                                />
                                            </div>
                                        )}

                                        {/* Show other fields generically if they are simple strings */}
                                        {Object.entries(item).map(([key, value]) => {
                                            if (['id', 'title', 'name', 'description', 'icon', 'tags', 'items', 'image', 'longDescription'].includes(key)) return null;
                                            if (typeof value !== 'string') return null;
                                            return (
                                                <div key={key} className={styles.fieldGroup}>
                                                    <label>{key}</label>
                                                    <input
                                                        value={value}
                                                        onChange={(e) => updateData([activeTab, index.toString(), key], e.target.value)}
                                                        className={styles.addTagInput}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

