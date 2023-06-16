    ComSysDatePicker - компонент для выбора диапазона дат и типа выбранных дат.
    Быстрый старт:
        import ComSysDatePicker from "./datepicker/comsys/ComSysDatePicker.svelte"
        ...
        <ComSysDatePicker />
    Дополнительные параметры:
        - startDatePickerInitialDate: Date - Начальная дата на левом календаре.
        - endDatePickerInitialDate: Date - Начальная дата на правом календаре.
        - groupingAliases: groupingAlias[] - список вариантов типов выбираемых дат. По умолчанию все варианты выбраны
            возможные варианты -  'day' | 'week' | 'month' | 'quarter' | 'year'
            Если передать пустой список, раздел не будет отображаться в интерфейсе.
        - activeGroupingAlias: groupingAlias - Начальный тип выбираемых дат. см. выше. По умолчанию 'day'
        -quickDatePickerAliases: quickDatePickerAlias[] - список вариантов для быстрого выбора дат на обоих пикерах.
            По умолчанию все варианты выбраны.
            возможные варианты - 'currentWeek' | 'lastWeek' | 'currentMonth' | 'lastMonth' | 'currentYear'
            Если передать пустой список, раздел не будет отображаться в интерфейсе.
    Возвращаемые значения.
        При выборе интересующих дат и активации кнопки "Применить" активируется событие "stateChanged"
        В параметре "detail" передается объект
        {
            startDate: Date - выбранная дата на левом календаре
            endDate: Date - выбранная дата на правом календаре
            grouping: groupingAlias - активный тип даты, вариант группировки, один из вариантов
                'day' | 'week' | 'month' | 'quarter' | 'year'
        }
        Событие вызывается только в том случае, если при активации кнопки "Применить" состояние отличается от
        начального либо отличается от состояния после последней активации кнопки "Применить"