
export class ModerationRepository {
    async isFirstNameAllowed(value: string): Promise<boolean> {
        return !containsBadWord(value)
    }

    async isLastNameAllowed(value: string | null): Promise<boolean> {
        return !containsBadWord(value)
    }
}

const badWords: string[] = [ /* empty array */ ]

function containsBadWord(string: string | null): boolean {
    if (string === null)
        return false

    for (const badWord of badWords) {
        if (string.includes(badWord))
            return true
    }

    return false
}
