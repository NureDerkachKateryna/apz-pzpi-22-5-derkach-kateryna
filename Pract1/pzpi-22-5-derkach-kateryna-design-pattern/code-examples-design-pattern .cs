public class Character
{
    public string CharacterClass { get; set; } = null!;
    public string Weapon { get; set; } = null!;
    public int Health { get; set; }
    public string SpecialAbility { get; set; } = null!;

    public void ShowInfo()
    {
        Console.WriteLine(@$"Character: {CharacterClass}, Weapon: {Weapon}, 
            Health: {Health}, Special Ability: {SpecialAbility}");
    }
}

public class CharacterManual
{
    public string Description { get; set; } = null!;

    public void AddInfo(string info) => Description += info + "\n";
    public void ShowManual() => Console.WriteLine("Character Manual:\n" + Description);
}

public interface ICharacterBuilder
{
    void Reset();
    void SetClass(string characterClass);
    void SetWeapon(string weapon);
    void SetHealth(int health);
    void SetSpecialAbility(string ability);
}

public class CharacterBuilder : ICharacterBuilder
{
    private Character _character = new Character();
    public void Reset() => _character = new Character();
    public void SetClass(string characterClass) => _character.CharacterClass = characterClass;
    public void SetWeapon(string weapon) => _character.Weapon = weapon;
    public void SetHealth(int health) => _character.Health = health;
    public void SetSpecialAbility(string ability) => _character.SpecialAbility = ability;
    public Character GetResult() => _character;
}

public class CharacterManualBuilder : ICharacterBuilder
{
    private CharacterManual _manual = new CharacterManual();
    public void Reset() => _manual = new CharacterManual();
    public void SetClass(string characterClass) => _manual.AddInfo($"Class: {characterClass}");
    public void SetWeapon(string weapon) => _manual.AddInfo($"Weapon: {weapon}");
    public void SetHealth(int health) => _manual.AddInfo($"Health: {health}");
    public void SetSpecialAbility(string ability) => _manual.AddInfo($"Special Ability: {ability}");
    public CharacterManual GetResult() => _manual;
}

public class Director
{
    public void ConstructWarrior(ICharacterBuilder builder)
    {
        builder.Reset();
        builder.SetClass("Warrior");
        builder.SetWeapon("Sword");
        builder.SetHealth(150);
        builder.SetSpecialAbility("Shield Block");
    }

    public void ConstructMage(ICharacterBuilder builder)
    {
        builder.Reset();
        builder.SetClass("Mage");
        builder.SetWeapon("Staff");
        builder.SetHealth(80);
        builder.SetSpecialAbility("Fireball");
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine("Your character:");

        Director director = new Director();

        CharacterBuilder characterBuilder = new CharacterBuilder();
        director.ConstructWarrior(characterBuilder);
        Character warrior = characterBuilder.GetResult();
        warrior.ShowInfo();

        Console.WriteLine("\nAll characters:");

        CharacterManualBuilder manualBuilder = new CharacterManualBuilder();
        director.ConstructWarrior(manualBuilder);
        CharacterManual warriorManual = manualBuilder.GetResult();
        warriorManual.ShowManual();

        manualBuilder.Reset();
        director.ConstructMage(manualBuilder);
        CharacterManual mageManual = manualBuilder.GetResult();
        mageManual.ShowManual();
    }
}

class Program1
{
    static void Main()
    {
        Console.WriteLine("Your character:");
        Character warrior = new Character();
        warrior.CharacterClass = "Warrior";
        warrior.Weapon = "Sword";
        warrior.Health = 150;
        warrior.SpecialAbility = "Shield Block";
        warrior.ShowInfo();

        Console.WriteLine("\nAll characters:");
        CharacterManual warriorManual = new CharacterManual();
        warriorManual.AddInfo("Class: Warrior");
        warriorManual.AddInfo("Weapon: Sword");
        warriorManual.AddInfo("Health: 150");
        warriorManual.AddInfo("Special Ability: Shield Block");
        warriorManual.ShowManual();

        CharacterManual mageManual = new CharacterManual();
        mageManual.AddInfo("Class: Mage");
        mageManual.AddInfo("Weapon: Staff");
        mageManual.AddInfo("Health: 80");
        mageManual.AddInfo("Special Ability: Fireball");
        mageManual.ShowManual();
    }
}
