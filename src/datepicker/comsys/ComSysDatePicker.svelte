<!--
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
-->

<script lang="ts">
    import Space from "./interface/Space.svelte"
    import DatePickerOrchestrator
        from "./interface/DatePickerOrchestrator.svelte"
    import {
        ComSysLeftDatePicker,
        ComSysRightDatePicker
    } from "./logic/datePickers"
    import {CalendarFactory} from "../../calendar/calendarFactory"
    import {dayjs} from "../../calendar/dayjs"
    import {GroupingFactory} from "./logic/groupingFactory"
    import {QuickDatePickerFactory} from "./logic/quickDatePickerFactory"
    import {DatePickerState} from "./logic/datePickerState"
    import Footer from "./interface/Footer.svelte"

    import {createEventDispatcher} from "svelte"
    import {ComSysDatePickerOrchestrator} from "./logic/orchestrator";

    type groupingAlias = 'day' | 'week' | 'month' | 'quarter' | 'year'
    type quickDatePickerAlias = 'currentWeek' | 'lastWeek' | 'currentMonth' | 'lastMonth' | 'currentYear'

    // Передайте начальную и конечную дату для инициализации пикера
    export let startDatePickerInitialDate: Date = new Date(Date.now() - 860000000) // random
    export let endDatePickerInitialDate: Date = new Date(Date.now())
    // Передайте варианты группировок и группировку, с которой будет инициализирован пикер.
    // Если передать пустой список в groupingAliases, элемент отображаться не будет
    export let groupingAliases: groupingAlias[] = ['day', 'week', 'month', 'quarter', 'year']
    export let activeGroupingAlias: groupingAlias = 'day'
    // Передайте варианты быстрых фильтров.
    // Если передать пустой список в quickDatePickerAliases, элемент отображаться не будет
    export let quickDatePickerAliases: quickDatePickerAlias[] = [
        'currentWeek', 'lastWeek', 'currentMonth', 'lastMonth', 'currentYear'
    ]

    function returnStateHandle() {
        if (datePickerState.isChange()) {
            dispatch('stateChanged', datePickerState.getState())
            datePickerState.updateInitialCast()
        }
    }

    // Инициализация классов группировок
    let groupingFactory = new GroupingFactory()
    let groupings = groupingFactory.getGroupings(groupingAliases)
    let activeGrouping = groupingFactory.getGrouping(activeGroupingAlias)

    // Инициализация классов быстрых фильтров
    let quickDatePickerFactory = new QuickDatePickerFactory()
    let quickDatePickers = quickDatePickerFactory.getQuickDatePickers(quickDatePickerAliases)

    // Инициализация календаря
    let calendarFactory = new CalendarFactory()
    let calendar = calendarFactory.getCalendar('base')

    // Инициализация пикеров
    let leftDatePicker = new ComSysLeftDatePicker(calendar, dayjs(startDatePickerInitialDate), activeGrouping)
    let rightDatePicker = new ComSysRightDatePicker(calendar, dayjs(endDatePickerInitialDate), activeGrouping)

    // Инициализация оркестратора пикеров. Отвечает за одновременное изменение дат на всех пикерах.
    let datePickersOrchestrator = new ComSysDatePickerOrchestrator(
        leftDatePicker, rightDatePicker, groupings, activeGrouping, quickDatePickers
    )
    // Инициализация класса, отвечающего на создания слепка состояния. Событие на изменение пикеров
    // будет проброшено только в случае, если состояние пикеров изменилось.
    let datePickerState = new DatePickerState(datePickersOrchestrator)

    const dispatch = createEventDispatcher()
</script>

<Space>
    <div class='date-picker-orchestrator' slot="date-picker-orchestrator">
        <DatePickerOrchestrator
            orchestrator={datePickersOrchestrator}
        />
    </div>
    <div class="footer" slot="footer">
        <Footer
            on:returnState={returnStateHandle}
        />
    </div>
</Space>

<style>
    .date-picker-orchestrator
    {
        flex-grow: 1;
    }
    .footer
    {
        height: 50px;
    }
</style>