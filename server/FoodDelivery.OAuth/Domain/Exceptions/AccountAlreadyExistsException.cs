namespace FoodDelivery.OAuth.Domain.Exceptions;

public class AccountAlreadyExistsException : Exception
{
    public AccountAlreadyExistsException(string email)
        : base($"Account with this {email} email already exists.")
    {
        
    }
}