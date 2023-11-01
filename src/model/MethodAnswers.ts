enum MethodAnswers {
    INSUFFICIENT_MONEY = 'INSUFFICIENT_MONEY',
    INSUFFICIENT_STASH = 'INSUFFICIENT_STASH',
    SUCCESS = 'SUCCESS',
    INSUFFICIENT_HOLD = 'INSUFFICIENT_HOLD',
    QUANTITY_ZERO = 'QUANTITY_ZERO',
    SAME_ORIGIN_AND_DESTINATION = 'SAME_ORIGIN_AND_DESTINATION',
    QUANTITY_NOT_WORTH_THE_FUSS = 'QUANTITY_NOT_WORTH_THE_FUSS',
    DEBT_CANCELLED = 'DEBT_CANCELLED',
    PARTIAL_PAYBACK_OK = 'PARTIAL_PAYBACK_OK',
    MINIMUM_LOAN_NOT_REACHED = 'MINIMUM_LOAN_NOT_REACHED',
    MAXIMUM_CREDIT_EXCEEDED = 'MAXIMUM_CREDIT_EXCEEDED',
    CURRENT_CREDIT_EXCEEDED = 'CURRENT_CREDIT_EXCEEDED'
}

export default MethodAnswers;