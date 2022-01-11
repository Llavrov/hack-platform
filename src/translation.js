import { createI18n } from "vue-i18n";

export default createI18n({
  locale: "ru",
  messages: {
    ru: {
      g: {
        notChosen: "Не выбрано",
        or: "или",
      },
      reg: {
        head: "Регистрация",
        or: "или",
        fname: "Имя",
        lname: "Фамилия",
        phone: "Телефон",
        email: "Почта",
        password: "Пароль",
        agree: {
          1: "Создавая учетную запись, вы соглашаетесь с",
          2: "terms of use",
          3: "и",
          4: "privacy policy",
        },
        create: "Создать аккаунт",
        haveq: "У вас уже есть аккаунт?",
        toLogIn: "Войти в систему",
      },
      lin: {
        head: "Вход",
        or: "или",
        email: "Почта",
        password: "Пароль",
        passwordForget: "Забыли пароль?",
        enter: "Войти",
        havenotq: "У вас нет аккаунта?",
        toReg: "Зарегистрируйтесь",
      },
      recover: {
        head: "Восстановить пароль",
        text: "Введите адрес электронной почты, который вы указали при создании личного кабинета. Мы отправим вам письмо с инструкциями",
        text2: "Введите новый пароль",
        email: "Почта",
        action: "Восстановить",
        verify: {
          head: "Подтверди почту",
          text: "Ура! Начало положено! Подтверди почту, пройдя по ссылке в письме. Затем заполни анкету - это обязательно для участия в хакатоне и займет не более 5 минут.",
          action: "Ок",
        },
      },
      nav: {
        status: "Анкета",
        news: "Новости",
        team: "Команда",
        solution: "Решение",
      },
      me: {
        head: "Ваша анкета",
        email: "Почта",
        phone: "Телефон",
        fname: "Имя",
        lname: "Фамилия",
        pname: "Отчество",
        bdate: "Дата рождения",
        sex: "Ваш пол:",
        country: "В какой стране ты проживаешь на данный момент?",
        region: "Регион",
        city: "Город",
        myContact: "Контакты. Любой вид связи(Facebook, telegram, ...).",
        1: {
          head: "Основная информация",
          action: "Продолжить",
        },
        heo: "ВУЗ",
        division: "На каком направлении ты учился(-ась)/ обучаешься?",
        gradYear: "В каком году ты заканчиваешь/закончил(а)",
        acadDeg: "Какая твоя последняя полученная ученая степень?",
        2: {
          head: "Образование",
          action: "Продолжить",
        },
        position: "Должность",
        jobType: "Форма занятости",
        jobPlace: "В какой компании ты работаешь?",
        jobLen: "Какой у тебя трудовой стаж? (в годах)",
        portfolio: "Портфолио/резюме",
        linkedIn: "Linkedin",
        3: {
          head: "Работа",
          action: "Продолжить",
        },
        infoSrc: "Откуда ты узнал(а) о NSD Progress.Tech?",
        task: "Выбери наиболее интересное для тебя задание",
        l4Work: "Ищите ли вы работу?:",
        participationReason:
          "Почему ты хочешь участвовать в NSD Progress.Tech, и почему мы должны тебя выбрать?",
        freeFromInfo:
          "Можешь рассказать нам еще что-нибудь важное или интересное",
        4: {
          head: "Дополнительная информация",
          action: "Завершить",
        },
      },
      todo: {
        profileUnfilled: "Профиль не заполнен",
        registerDeadline: "Дедлайн регистрации:",
        acceptDeadline: "Крайний срок подтверждения:",
        1: {
          title: "Подтверди почту",
        },
        2: {
          title: "Заполни анкету участника",
          1: "Заполнить",
        },
        3: {
          title: "Создай или присоединись к команде",
          1: "Присоединиться",
          2: "Создать",
        },
        4: {
          title: "Жди приглашение и участвуй в",
          1: "Подробнее",
        },
        5: {
          title: "Подтверди свое участие",
          1: "Подтвердить участие",
        },
        verify: {
          head: "Подтверждение участия",
          text: "Для того чтобы участвовать в хакатоне подверди свое участие до",
          action: "Подтвердить участие",
          refuse: "Отклонить участие",
        },
      },
      participateVerify: {
        head: "Подтверждение",
        sub: "Подпишись на нас в социальных сетях. Будь в курсе новостей первым!",
        addInfo: "Дополнить информацию о себе",
        addInfoPh: "Описание",
        action: "Отправить",
      },
      team: {
        head: "Команда",
        join: "Присоединиться",
        join2: "Присоеди- ниться",
        create: "Создать команду",
        myteam: "Моя команда",
        find: "Найти команду",
        1: {
          head: "Присоедениться к команде",
          text: "В вашей команде должно быть не менее 3 человек для прохождение в следующий этап",
          action: "Продолжить",
        },
        joinCode: "Введите код, чтобы присоедениться к команде",
        2: {
          head: "Создать команду",
          text: "Чтобы создать команду, придумай название и введи его в форму ниже.",
          action: "Создать команду",
        },
        teamName: "Название команды",
        teamDescription: "Описание команды",
        3: {
          head: "Ваша команда",
          text: "Чтобы присоединиться к этой команде, ваши сокомандники должны ввести код либо перейти по ссылке",
          text2:
            "Только помни, что они должны предварительно зарегистрироваться на платформе и подтвердить электронную почту.",
          leave: {
            head: "Состав команды",
            text: "Кто-то, кто ещё не заполнил свою анкету! (капитан)",
            action: "Покинуть команду",
          },
        },
        taskSelect: "Выберите задачу",
        rolesSelect: "Выберите нужные роли",
        4: {
          head: "Информация о тебе",
          text: "Предоставь информацию о себе/своей команде, чтобы получить доступ к информации о других участниках и командах, которые ищут сокомандников.",
          action: "Продолжить",
        },
        myRole: "Что лучше всего описывает твою роль на хакатоне? (до 3)",
        myTask:
          "Задания, в которых твоя команда больше всего заинтересована (до 3)",
        myDescr: "Опиши себя",
        myDescrPh:
          "Постарайся предоставить информацию, которая поможет другим людям оценить тебя: опиши свои навыки, интересы, идеи и т.д.",
        action: "Продолжить",
        56: {
          head: "Здесь ты можешь найди себе команду либо отдельного участника",
          text11:
            "Каждый день ты можешь отправить до 10 запросов объединиться в команду напрямую через платформу (мы отправим анкету из этого раздела вместе с твоим адресом электронной почты).",
          text12: "У тебя осталось {invitesLeft} запросов.",
          text13:
            "Если их не останется, ты все равно сможешь искать сокомандников и связываться с ними по контактам, которые они оставляют в анкете на этой странице.",
          text21: "Когда закончишь подбор команды, нажми кнопку «",
          text23: "» снизу!",
          searchPh: "Поиск по заданию, роли или названию",
          action: "Закончить подбор",
        },
        teamFindPl: "Поиск по заданию, роли или названию",
        5: {
          name: "Команды",
        },
        6: {
          name: "Участники",
        },
        details: {
          toContact: "Связаться можно по ссылке ",
        },
      },
      news: {
        head: "Новости Хакатона",
      },
      solution: {
        head: "Командное решение",
        descrStatus: "Опишите вам текущий статус",
        descrStatusPh: "Описание",
        todoFurther: "Что планируете делать дальше?",
        todoFurtherPh: "Описание",
        questions: "Какие вопросы у вас возникли?",
        questionsPh: "Описание",
        action: "Отправить",
        resultTask: "Над какими задачами и номинациями работаете?",
        ideaDescr: "Краткое описание идеи/ проекта",
        codeLink: "Ссылка на исходный код",
        demoLink: "Ссылка на демо видео",
        ideaDescrPl: "Описание",
        codeLinkPl: "Code server",
        demoLinkPl: "Code server",
        loadPresentation: "Загрузите презентацию своего проекта",
        presentationNamePl: "Выбрать файл (PDF до 10 мб)",
      },
      activities: {
        head: "#OnlineActivities",
        subtext:
          "We have prepared cool limited hackers merch for you. But to get it you need to take part in several activities.",
        1: {
          head: {
            1: "Ваш #socialcode",
            2: "#OnlineActivities",
          },
          sub: {
            1: "Текущий прогресс:",
            2: "регистраций",
            3: "Share this code with other hackers. For you to receive a point, three of your friends should enter this code in their profiles!",
          },
        },
        2: {
          head: "Пост в социальных сетях",
          sub: "Post photo or story in your social media about your preparation to Hackathon with hashtag #hackathon.",
          postLink: "Ссылка на твой пост",
          postLinkPl: "Link",
          action: "Отправить",
        },
        3: {
          head: "Соревнование",
          sub: "We have made a small CTF on our main hackathon page. Solve it and share the code here.",
          code: "Code",
          codePl: "Link",
          action: "Отправить",
        },
      },
    },
  },
});