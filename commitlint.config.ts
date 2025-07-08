import type { UserConfig } from '@commitlint/types'

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  prompt: {
    messages: {
      skip: '(для пропуска нажмите Enter)',
      max: '(максимум %d символов)',
      min: '(минимум %d символов)',
      emptyWarning: 'Поле обязательно',
      upperLimitWarning: 'Превышен лимит',
      lowerLimitWarning: 'Ниже лимита',
    },
    questions: {
      type: {
        description:
          'Выберите тип изменения, которое коммитите, используя стрелки, для выбора используйте Enter',
        enum: {
          feat: {
            description: 'Новая фича',
            title: 'Feature',
          },
          fix: {
            description: 'Фикс бага',
            title: 'Bug Fixes',
          },
          docs: {
            description: 'Изменения документации',
            title: 'Documentation',
          },
          style: {
            description:
              'Изменения, которые не влияют на смысл кода (пробелы, форматирование, отсутствие точек с запятой и т.д.)',
            title: 'Styles',
          },
          refactor: {
            description: 'Рефакторинг без добавления фич или фиксов багов',
            title: 'Code Refactoring',
          },
          perf: {
            description: 'Изменение кода, которое улучшает производительность',
            title: 'Performance Improvements',
          },
          test: {
            description:
              'Добавление тестов или исправление существующих тестов',
            title: 'Tests',
          },
          build: {
            description:
              'Изменения, влияющие на сборку или внешние зависимости',
            title: 'Builds',
          },
          ci: {
            description: 'Изменения в конфигурационных файлах и скриптах CI',
            title: 'Continuous Integrations',
          },
          chore: {
            description:
              'Другие изменения, которые не затрагивают файлы src или test',
            title: 'Chores',
          },
          revert: {
            description: 'Отмена предыдущего коммита',
            title: 'Reverts',
          },
        },
      },
      scope: {
        description:
          'Какая область затрагивается этим коммитом (например, имя компонента или файла)',
      },
      subject: {
        description:
          'Напишите короткое, обобщенное, описание коммита в настоящем времени',
      },
      body: {
        description: 'Напишите более длинное, детальное, описание коммита',
      },
      isBreaking: {
        description:
          'Подразумевает ли этот коммит нарушение обратной совместимости BREAKING CHANGE?',
      },
      breakingBody: {
        description:
          'Коммит с BREAKING CHANGE требует полное описание. Введите развернутое описание коммита',
      },
      breaking: {
        description: 'Опишите изменения, нарушающие обратную совместимость',
      },
      isIssueAffected: {
        description: 'Затрагивает ли это изменение какие-либо issue?',
      },
      issuesBody: {
        description:
          'Если issue закрыты в результате коммита, требует полное описание. Введите развернутое описание коммита',
      },
      issues: {
        description: 'Добавьте ссылки на issue, которые закрывает этот коммит',
      },
    },
  },
}

export default config
