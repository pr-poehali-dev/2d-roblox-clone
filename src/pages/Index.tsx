import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Game {
  id: number;
  title: string;
  description: string;
  players: number;
  rating: number;
  category: string;
  difficulty: 'Легко' | 'Средне' | 'Сложно';
  coins: number;
}

interface PromoCode {
  code: string;
  coins: number;
  description: string;
  active: boolean;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

interface UserStats {
  level: number;
  totalCoins: number;
  gamesPlayed: number;
  winRate: number;
  ranking: number;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('games');
  const [userCoins, setUserCoins] = useState(250);
  const [promoCode, setPromoCode] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const [selectedSkin, setSelectedSkin] = useState('default');

  const games: Game[] = [
    { id: 1, title: 'Побег из тюрьмы', description: 'Сбежи из самой охраняемой тюрьмы, избегая стражников и ловушек', players: 1247, rating: 4.8, category: 'Приключения', difficulty: 'Сложно', coins: 50 },
    { id: 2, title: 'Паркур Мастер', description: 'Прыгай, бегай и взбирайся на небоскребы в эпическом паркур-приключении', players: 892, rating: 4.7, category: 'Спорт', difficulty: 'Средне', coins: 30 },
    { id: 3, title: 'PvP Стрелялка', description: 'Сражайся с игроками со всего мира в интенсивных боях на арене', players: 2156, rating: 4.9, category: 'Экшн', difficulty: 'Сложно', coins: 75 },
    { id: 4, title: 'Босс Раш', description: 'Победи череду могущественных боссов в эпических битвах', players: 634, rating: 4.6, category: 'Экшн', difficulty: 'Сложно', coins: 100 },
    { id: 5, title: 'Космический Исследователь', description: 'Исследуй галактику, открывай новые планеты и встречай инопланетян', players: 567, rating: 4.5, category: 'Приключения', difficulty: 'Средне', coins: 40 },
    { id: 6, title: 'Гонки на Выживание', description: 'Участвуй в смертельных гонках на постапокалиптических трассах', players: 789, rating: 4.4, category: 'Гонки', difficulty: 'Средне', coins: 35 },
    { id: 7, title: 'Защитник Башни', description: 'Стратегически размещай башни для защиты от волн врагов', players: 445, rating: 4.3, category: 'Стратегия', difficulty: 'Легко', coins: 25 },
    { id: 8, title: 'Пиратское Приключение', description: 'Стань капитаном пиратского корабля и ищи сокровища', players: 356, rating: 4.7, category: 'Приключения', difficulty: 'Средне', coins: 45 },
    { id: 9, title: 'Зомби Апокалипсис', description: 'Выживай в мире, захваченном зомби-ордами', players: 923, rating: 4.8, category: 'Хоррор', difficulty: 'Сложно', coins: 60 },
    { id: 10, title: 'Магическая Академия', description: 'Изучай заклинания и сражайся с темными силами', players: 234, rating: 4.2, category: 'RPG', difficulty: 'Средне', coins: 55 },
    { id: 11, title: 'Ниндзя Война', description: 'Используй древние техники ниндзя в секретных миссиях', players: 678, rating: 4.6, category: 'Экшн', difficulty: 'Сложно', coins: 65 },
    { id: 12, title: 'Подводный Мир', description: 'Исследуй глубины океана и открывай морские тайны', players: 456, rating: 4.4, category: 'Исследование', difficulty: 'Легко', coins: 30 },
    { id: 13, title: 'Киберпанк 2099', description: 'Хакерские миссии в неоновом будущем мегаполиса', players: 567, rating: 4.7, category: 'Киберпанк', difficulty: 'Сложно', coins: 70 },
    { id: 14, title: 'Дикий Запад', description: 'Стань шерифом в городке Дикого Запада', players: 345, rating: 4.3, category: 'Вестерн', difficulty: 'Средне', coins: 40 },
    { id: 15, title: 'Лабиринт Ужасов', description: 'Найди выход из мрачного лабиринта, полного ловушек', players: 234, rating: 4.1, category: 'Хоррор', difficulty: 'Сложно', coins: 50 },
    { id: 16, title: 'Спортивная Арена', description: 'Соревнуйся в различных спортивных дисциплинах', players: 678, rating: 4.5, category: 'Спорт', difficulty: 'Легко', coins: 20 },
    { id: 17, title: 'Мир Драконов', description: 'Приручай драконов и участвуй в воздушных битвах', players: 789, rating: 4.8, category: 'Фэнтези', difficulty: 'Средне', coins: 80 },
    { id: 18, title: 'Городской Строитель', description: 'Построй и управляй собственным мегаполисом', players: 456, rating: 4.2, category: 'Симулятор', difficulty: 'Легко', coins: 25 },
    { id: 19, title: 'Галактические Войны', description: 'Командуй флотом в эпических космических сражениях', players: 890, rating: 4.9, category: 'Стратегия', difficulty: 'Сложно', coins: 90 }
  ];

  const promoCodes: PromoCode[] = [
    { code: 'GG2025', coins: 100, description: 'Новогодний бонус 2025', active: true },
    { code: 'ROCKET2024', coins: 150, description: 'Космический старт', active: true },
    { code: 'WINNER777', coins: 200, description: 'Удача победителя', active: true }
  ];

  const achievements: Achievement[] = [
    { id: 1, title: 'Первая победа', description: 'Выиграйте свою первую игру', unlocked: true, progress: 1, maxProgress: 1 },
    { id: 2, title: 'Исследователь', description: 'Сыграйте в 10 разных игр', unlocked: false, progress: 7, maxProgress: 10 },
    { id: 3, title: 'Коллекционер монет', description: 'Накопите 1000 монет', unlocked: false, progress: 250, maxProgress: 1000 },
    { id: 4, title: 'Король арены', description: 'Выиграйте 50 PvP матчей', unlocked: false, progress: 23, maxProgress: 50 }
  ];

  const userStats: UserStats = {
    level: 15,
    totalCoins: userCoins,
    gamesPlayed: 47,
    winRate: 68,
    ranking: 2847
  };

  const skins = [
    { id: 'default', name: 'Классический', price: 0, owned: true },
    { id: 'ninja', name: 'Ниндзя', price: 100, owned: false },
    { id: 'pirate', name: 'Пират', price: 150, owned: false },
    { id: 'astronaut', name: 'Космонавт', price: 200, owned: false },
    { id: 'wizard', name: 'Волшебник', price: 250, owned: false }
  ];

  const handlePromoCode = () => {
    const promo = promoCodes.find(p => p.code === promoCode.toUpperCase() && p.active);
    if (promo) {
      setUserCoins(prev => prev + promo.coins);
      setPromoMessage(`Успешно! Получено ${promo.coins} монет`);
      // Деактивируем промокод после использования
      promo.active = false;
    } else {
      setPromoMessage('Неверный или уже использованный промокод');
    }
    setPromoCode('');
  };

  const buySkin = (skin: any) => {
    if (userCoins >= skin.price && !skin.owned) {
      setUserCoins(prev => prev - skin.price);
      skin.owned = true;
      setSelectedSkin(skin.id);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Легко': return 'bg-green-500';
      case 'Средне': return 'bg-yellow-500';
      case 'Сложно': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                GAME PLATFORM
              </div>
              <Badge variant="secondary" className="bg-game-orange text-white">
                2D Universe
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-card rounded-lg px-3 py-2">
                <Icon name="Coins" size={20} className="text-yellow-500" />
                <span className="font-semibold">{userCoins}</span>
              </div>
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  U
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-card/30 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-7 bg-transparent h-12">
              <TabsTrigger value="games" className="data-[state=active]:bg-primary">
                <Icon name="Gamepad2" size={16} className="mr-2" />
                Игры
              </TabsTrigger>
              <TabsTrigger value="shop" className="data-[state=active]:bg-primary">
                <Icon name="ShoppingBag" size={16} className="mr-2" />
                Магазин
              </TabsTrigger>
              <TabsTrigger value="profile" className="data-[state=active]:bg-primary">
                <Icon name="User" size={16} className="mr-2" />
                Профиль
              </TabsTrigger>
              <TabsTrigger value="tournaments" className="data-[state=active]:bg-primary">
                <Icon name="Trophy" size={16} className="mr-2" />
                Турниры
              </TabsTrigger>
              <TabsTrigger value="news" className="data-[state=active]:bg-primary">
                <Icon name="Newspaper" size={16} className="mr-2" />
                Новости
              </TabsTrigger>
              <TabsTrigger value="support" className="data-[state=active]:bg-primary">
                <Icon name="MessageCircle" size={16} className="mr-2" />
                Поддержка
              </TabsTrigger>
              <TabsTrigger value="promo" className="data-[state=active]:bg-primary">
                <Icon name="Gift" size={16} className="mr-2" />
                Промо
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Games Tab */}
          <TabsContent value="games" className="space-y-6">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Добро пожаловать в игровую вселенную!
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                19 уникальных игр ждут тебя. Сражайся с умными NPC, зарабатывай монеты и становись легендой!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game) => (
                <Card key={game.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-card/50 border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {game.title}
                      </CardTitle>
                      <Badge className={getDifficultyColor(game.difficulty)}>
                        {game.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Icon name="Users" size={14} className="mr-1" />
                        {game.players}
                      </div>
                      <div className="flex items-center">
                        <Icon name="Star" size={14} className="mr-1 text-yellow-500" />
                        {game.rating}
                      </div>
                      <div className="flex items-center">
                        <Icon name="Coins" size={14} className="mr-1 text-yellow-500" />
                        {game.coins}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-sm leading-relaxed">
                      {game.description}
                    </CardDescription>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="text-xs">
                        {game.category}
                      </Badge>
                      <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80">
                        <Icon name="Play" size={16} className="mr-2" />
                        Играть
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Shop Tab */}
          <TabsContent value="shop" className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-primary">Магазин скинов</h2>
              <p className="text-muted-foreground">Персонализируй своего персонажа уникальными скинами</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {skins.map((skin) => (
                <Card key={skin.id} className={`text-center transition-all duration-300 hover:scale-105 ${selectedSkin === skin.id ? 'ring-2 ring-primary' : ''}`}>
                  <CardHeader>
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-2 flex items-center justify-center">
                      <Icon name="User" size={32} className="text-white" />
                    </div>
                    <CardTitle className="text-lg">{skin.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {skin.owned ? (
                      <Button 
                        variant={selectedSkin === skin.id ? "default" : "outline"}
                        onClick={() => setSelectedSkin(skin.id)}
                        className="w-full"
                      >
                        {selectedSkin === skin.id ? 'Активен' : 'Выбрать'}
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => buySkin(skin)}
                        disabled={userCoins < skin.price}
                        className="w-full bg-gradient-to-r from-game-orange to-game-blue hover:opacity-90"
                      >
                        <Icon name="Coins" size={16} className="mr-2" />
                        {skin.price}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-center text-2xl text-purple-400">Донат пакеты</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="text-center bg-card/50">
                    <CardHeader>
                      <CardTitle className="text-green-400">Стартовый</CardTitle>
                      <div className="text-2xl font-bold">₽99</div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div>500 монет</div>
                        <div>1 эксклюзивный скин</div>
                        <div>VIP статус на 7 дней</div>
                      </div>
                      <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                        Купить
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="text-center bg-card/50 ring-2 ring-primary">
                    <CardHeader>
                      <CardTitle className="text-primary">Популярный</CardTitle>
                      <div className="text-2xl font-bold">₽199</div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div>1200 монет</div>
                        <div>3 эксклюзивных скина</div>
                        <div>VIP статус на 30 дней</div>
                        <div>Эксклюзивная анимация</div>
                      </div>
                      <Button className="w-full mt-4 bg-primary hover:bg-primary/80">
                        Купить
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="text-center bg-card/50">
                    <CardHeader>
                      <CardTitle className="text-yellow-400">Премиум</CardTitle>
                      <div className="text-2xl font-bold">₽399</div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div>3000 монет</div>
                        <div>5 эксклюзивных скинов</div>
                        <div>VIP статус на 90 дней</div>
                        <div>Все анимации</div>
                        <div>Приоритет в очереди</div>
                      </div>
                      <Button className="w-full mt-4 bg-yellow-600 hover:bg-yellow-700">
                        Купить
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      U
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle>Игрок #{userStats.ranking}</CardTitle>
                  <CardDescription>Уровень {userStats.level}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{userStats.totalCoins}</div>
                      <div className="text-xs text-muted-foreground">Монет</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-secondary">{userStats.gamesPlayed}</div>
                      <div className="text-xs text-muted-foreground">Игр сыграно</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-accent">{userStats.winRate}%</div>
                    <div className="text-xs text-muted-foreground">Процент побед</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Достижения</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center space-x-4 p-3 rounded-lg bg-card/50">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${achievement.unlocked ? 'bg-yellow-500' : 'bg-muted'}`}>
                        <Icon name={achievement.unlocked ? "Trophy" : "Lock"} size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{achievement.title}</div>
                        <div className="text-sm text-muted-foreground">{achievement.description}</div>
                        {!achievement.unlocked && (
                          <div className="mt-2">
                            <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                            <div className="text-xs text-muted-foreground mt-1">
                              {achievement.progress}/{achievement.maxProgress}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tournaments Tab */}
          <TabsContent value="tournaments" className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-primary">Турниры</h2>
              <p className="text-muted-foreground">Соревнуйся с лучшими игроками за призы и славу</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/20">
                <CardHeader>
                  <CardTitle className="text-red-400">Еженедельный PvP</CardTitle>
                  <CardDescription>До окончания: 3 дня 12 часов</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Участников:</span>
                      <span className="font-semibold">247/500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Призовой фонд:</span>
                      <span className="font-semibold text-yellow-500">5000 монет</span>
                    </div>
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      Участвовать
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-blue-400">Паркур Чемпионат</CardTitle>
                  <CardDescription>До окончания: 1 день 6 часов</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Участников:</span>
                      <span className="font-semibold">89/200</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Призовой фонд:</span>
                      <span className="font-semibold text-yellow-500">3000 монет</span>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Участвовать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* News Tab */}
          <TabsContent value="news" className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-primary">Новости и обновления</h2>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Новый турнир "Босс Раш"</CardTitle>
                    <Badge variant="secondary">Сегодня</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Запускается новый еженедельный турнир! Побеждайте боссов на скорость и выигрывайте уникальные награды.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Обновление ИИ противников</CardTitle>
                    <Badge variant="outline">2 дня назад</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Все NPC стали намного умнее! Теперь они адаптируются к вашему стилю игры и создают уникальные тактические вызовы.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Новые скины в магазине</CardTitle>
                    <Badge variant="outline">5 дней назад</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Добавлены эксклюзивные скины: Космический рейнджер, Киберниндзя и Драконий маг. Не пропустите!</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-primary">Поддержка игроков</h2>
              <p className="text-muted-foreground">Мы всегда готовы помочь тебе!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Частые вопросы</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="HelpCircle" size={16} className="mr-2" />
                      Как получить больше монет?
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="HelpCircle" size={16} className="mr-2" />
                      Как работают промокоды?
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="HelpCircle" size={16} className="mr-2" />
                      Проблемы с подключением
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="HelpCircle" size={16} className="mr-2" />
                      Как участвовать в турнирах?
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Связаться с нами</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                    <Icon name="MessageCircle" size={16} className="mr-2" />
                    Чат с поддержкой
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Mail" size={16} className="mr-2" />
                    support@gameplatform.com
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="MessageSquare" size={16} className="mr-2" />
                    Telegram: @gameplatform_support
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Users" size={16} className="mr-2" />
                    Discord сообщество
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Promo Tab */}
          <TabsContent value="promo" className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-primary">Промокоды</h2>
              <p className="text-muted-foreground">Введи промокод и получи бонусные монеты!</p>
            </div>

            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-center">Активировать промокод</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Введи промокод"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="uppercase"
                  />
                  <Button onClick={handlePromoCode} className="bg-gradient-to-r from-primary to-secondary">
                    <Icon name="Gift" size={16} className="mr-2" />
                    OK
                  </Button>
                </div>
                {promoMessage && (
                  <div className={`text-center p-2 rounded ${promoMessage.includes('Успешно') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {promoMessage}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-4 text-center">Доступные промокоды</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {promoCodes.filter(p => p.active).map((promo) => (
                  <Card key={promo.code} className="text-center bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-primary">{promo.code}</CardTitle>
                      <CardDescription>{promo.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-yellow-500 mb-2">
                        +{promo.coins} монет
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setPromoCode(promo.code)}
                      >
                        Использовать
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;